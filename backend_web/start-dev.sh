#!/bin/sh
exec erl \
    -pa ebin deps/*/ebin \
    -boot start_sasl \
    -sname backend_web \
    -s backend_web \
    -s reloader
