// requirejs configuration
// third party dependencies => lib
// application logic => app

requirejs.config({
    baseUrl: 'files/scripts/lib',
    paths: {
        app: '../app'
    }
});

requirejs(['app/main']);
