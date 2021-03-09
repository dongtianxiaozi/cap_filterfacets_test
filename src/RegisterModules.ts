import moduleAlias from 'module-alias';

// Or multiple aliases
moduleAlias.addAliases({
	'@Root': __dirname + '/',
	'@Application': __dirname + '/application',
	'@Core': __dirname + '/core',
	'@Features': __dirname + '/features',
	'@Logger': __dirname + '/logger',
	'@Persistence': __dirname + '/persistence',
	'@Remote': __dirname + '/remote',
	'@Results': __dirname + '/results',
	'@Shared': __dirname + '/shared',
	'@Utils': __dirname + '/utils',
});

// Or let module-alias to figure where your package.json is
// located. By default it will look in the same directory
// where you have your node_modules (application's root)
moduleAlias();
