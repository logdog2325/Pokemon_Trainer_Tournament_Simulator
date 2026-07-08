/*
 * The Arena is now served by the unified Champions Lab server, which also hosts
 * the Team Builder app and the sim API (/api/matrix, /api/optimize, …) that the
 * Arena client depends on. This shim just launches that server so the old
 * command keeps working.
 *
 *   node champions-sim/arena/server.mjs   →   same as   node champions-sim/server.mjs
 *   open http://localhost:8790/arena/
 */
import '../server.mjs';
