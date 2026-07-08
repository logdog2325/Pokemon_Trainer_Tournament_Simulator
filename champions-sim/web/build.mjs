/*
 * Bundles the Champions engine (+ GameplanBot + analyzers) to run in the browser,
 * emitting champions-team-building/app/sim/engine.web.js. Stubs the Node-only code
 * the offline sim never uses (net/db/mail/server/repl) and patches the engine's
 * dynamic data loading to a static manifest (datamap.gen.js). Run gen-datamap.mjs first.
 */
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', '..', 'pokemon-showdown', 'dist');
const RPAI = path.join(DIST, 'sim', 'tools', 'random-player-ai');
const DATAMAP = path.join(__dirname, 'datamap.gen.js');
const OUT = path.resolve(__dirname, '..', '..', 'champions-team-building', 'app', 'sim', 'engine.web.js');

const BARE = ['fs','net','http','https','tls','dgram','dns','child_process','repl','cluster','readline',
  'crypto','node:crypto','node:fs','node:net','node:http','node:https','node:os','os','v8','inspector','node:readline',
  'events','url','stream','string_decoder','querystring','zlib','assert','constants',
  'node:events','node:stream','node:url','node:zlib','perf_hooks','node:perf_hooks',
  'node:fs/promises','fs/promises','worker_threads','node:worker_threads',
  'nodemailer','pg','ws','sockjs','better-sqlite3','node-oom-heapdump','sql-template-strings','pokemon-showdown'];
const EMPTY_FILE = /(pokemon-showdown[\\/]dist[\\/]server[\\/]|lib[\\/](sql|net|static-server)\.js$|sim[\\/]examples[\\/]|node_modules[\\/](nodemailer|pg|ws|sockjs|better-sqlite3|node-oom-heapdump)[\\/])/;

const patchPlugin = {
  name: 'ps-patch',
  setup(b){
    b.onResolve({filter: new RegExp('^('+BARE.map(s=>s.replace(/[.*+?^${}()|[\]\\/]/g,'\\$&')).join('|')+')$')},
      a=>({path:a.path, namespace:'stub'}));
    b.onLoad({filter:/.*/, namespace:'stub'}, ()=>({contents:'module.exports={};', loader:'js'}));
    b.onLoad({filter: EMPTY_FILE}, ()=>({contents:'module.exports={};', loader:'js'}));

    b.onLoad({filter:/gameplan-bot\.js$/}, async a=>{
      let t = await fs.promises.readFile(a.path,'utf8');
      t = t.replace(/const \{ RandomPlayerAI \} = require\(path\.join\(DIST, 'sim', 'tools', 'random-player-ai'\)\);/,
        'const { RandomPlayerAI } = require(' + JSON.stringify(RPAI) + ');');
      return {contents:t, loader:'js', resolveDir:path.dirname(a.path)};
    });
    b.onLoad({filter:/sim[\\/]dex\.js$/}, async a=>{
      let t = await fs.promises.readFile(a.path,'utf8');
      t = 'const {psRequire:__psR,psReaddirMods:__psRD}=require('+JSON.stringify(DATAMAP)+');\n'+t;
      t = t.replace(/require\(filePath\)/g,'__psR(filePath)')
           .replace(/require\(`\$\{DATA_DIR\}\/text\/\$\{name\}`\)/g,'__psR(`${DATA_DIR}/text/${name}`)')
           .replace(/require\(path\.resolve\(DATA_DIR, "aliases"\)\)/g,'__psR(path.resolve(DATA_DIR, "aliases"))')
           .replace(/fs\.readdirSync\(MODS_DIR\)/g,'__psRD()');
      return {contents:t, loader:'js', resolveDir:path.dirname(a.path)};
    });
    b.onLoad({filter:/sim[\\/]dex-formats\.js$/}, async a=>{
      let t = await fs.promises.readFile(a.path,'utf8');
      t = 'const {psRequire:__psR}=require('+JSON.stringify(DATAMAP)+');\n'+t;
      t = t.replace(/require\(`\$\{__dirname\}\/\.\.\/config\/custom-formats`\)/g,'__psR("config/custom-formats")')
           .replace(/require\(`\$\{__dirname\}\/\.\.\/config\/formats`\)/g,'__psR("config/formats")');
      return {contents:t, loader:'js', resolveDir:path.dirname(a.path)};
    });
  }
};
esbuild.build({
  entryPoints:[path.join(__dirname,'engine-entry.js')], bundle:true, outfile:OUT, platform:'browser', format:'iife',
  define:{__dirname:'"/sim"', __filename:'"/sim/index.js"', 'process.env.NODE_ENV':'"production"', global:'globalThis'},
  inject:[path.join(__dirname,'process-shim.js')],
  alias:{path:'path-browserify', util:path.join(__dirname,'util-shim.js'), 'node:util':path.join(__dirname,'util-shim.js'), 'util/types':path.join(__dirname,'util-shim.js')},
  loader:{'.map':'empty'}, plugins:[patchPlugin], logLevel:'error', legalComments:'none', minify:true,
}).then(()=>console.log('engine.web.js → '+OUT+'  ('+(fs.statSync(OUT).size/1024/1024).toFixed(2)+' MB)'))
 .catch(e=>{console.error('BUNDLE FAILED:', e.message); process.exit(1);});
