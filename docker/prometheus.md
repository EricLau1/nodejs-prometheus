# Rodando com Docker

```bash
    export PROMETHEUS_CONFIG=/home/eric/Devlopment/nodejs/monitoramento/docker

    docker run --name prometheus --rm -d -p 9090:9090 -v $PROMETHEUS_CONFIG/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus

    # Comandos uteis
    
    # listando containers
    docker container ls

    # parar o container (por causa da flag --rm este container sera deletado com este comadno)
    docker container stop prometheus

    # reiniciar container
    docker container restart prometheus
```

## Queries

Query para mostrar a quantidade de requests por minuto:

```
    increase(app_requests_total[1m])
```

Query para somar metricas do mesmo tipo com labels diferentes:

```
    sum(increase(app_requests_total[1m]))
```

Query para filtrar metricas do mesmo tipo com labels diferentes:

```    
    increase(app_requests_total{statusCode="200"}[1m])
```

