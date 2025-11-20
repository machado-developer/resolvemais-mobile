@echo off
echo Aguardando 1 minuto antes de executar npm i...
echo Iniciando em: %time%
timeout /t 60 /nobreak >nul
echo.
echo Executando npm i...
npm i
echo Instalacao concluida!
pause