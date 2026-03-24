// esbuild.mjs - Bundles all Processing VS Code extension entry points
import esbuild from 'esbuild';
import { join } from 'path';

const root = process.cwd();

const builds = [
	{
		entry: join(root, 'src/extension.ts'),
		outfile: join(root, 'out/extension.js'),
		platform: 'node',
		external: ['vscode'],
		format: 'cjs',
		bundle: true,
		sourcemap: true
	},
	{
		entry: join(root, 'client/src/extension.ts'),
		outfile: join(root, 'client/out/extension.js'),
		platform: 'node',
		external: ['vscode'],
		format: 'cjs',
		bundle: true,
		sourcemap: true
	},
	{
		entry: join(root, 'server/src/server.ts'),
		outfile: join(root, 'server/out/server.js'),
		platform: 'node',
		external: ['vscode'],
		format: 'cjs',
		bundle: true,
		sourcemap: true
	},
	{
		entry: join(root, 'debugger/src/extension.ts'),
		outfile: join(root, 'debugger/out/extension.js'),
		platform: 'node',
		external: ['vscode'],
		format: 'cjs',
		bundle: true,
		sourcemap: true
	}
];

Promise.all(
	builds.map(cfg =>
		esbuild.build({
			entryPoints: [cfg.entry],
			outfile: cfg.outfile,
			platform: cfg.platform,
			external: cfg.external,
			format: cfg.format,
			bundle: cfg.bundle,
			sourcemap: cfg.sourcemap,
			logLevel: 'info'
		})
	)
).then(() => {
	console.log('All bundles built successfully.');
	process.exit(0);
}).catch(e => {
	console.error(e);
	process.exit(1);
});
