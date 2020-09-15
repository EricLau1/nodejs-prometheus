const express = require('express');
const client = require('prom-client');

const register = client.register;

const app = express();

const counter = new client.Counter({
    name: 'app_requests_total',
    help: 'Contador de requests',
    labelNames: ['statusCode'],
});

const gauge = new client.Gauge({
    name: 'app_free_bytes',
    help: 'Exemplo de Gauge'
});

const histogram = new client.Histogram({
    name: 'app_requests_time_seconds',
    help: 'Tempo de reposta da API',

    // o histogram irá mostra a quantidade de requisições
    // para cada valor do bucket
    // 0.1 igual 100 milisegundos
    // 0.2 igual 200 milisegundos
    // 0.3 igual 300 milisegundos
    // 0.4 igual 400 milisegundos
    // 0.5 igual a metade de 1 segundo  
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5],
});

const summary = new client.Summary({
    name: 'app_summary_requests_time_seconds',
    help: 'Exemplo com Summary',

    // Summary irá mostrar os milisegundos atingidos para
    // cada valor em porcentagem definido no percentiles.
    // Ex:
    // 0.5 igual 50% das requisições demoram X milisegundos para executar
    // 0.9 igual 90% das requisições demoram X milisegundos para executar
    // 0.99 igual 99% das requisições demoram X milisegundos para executar
    percentiles: [0.5, 0.9, 0.99]
});

app.get('/', (req, res) => {
    counter.labels('200').inc();

    gauge.set(Math.random() * 100);

    const time = Math.random();

    histogram.observe(time);
    summary.observe(time);

    res.send('Hello World!');
})

app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});

app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log(`Listening on http://localhost:${app.get('port')}`);
});