@echo off

git add .
IF %ERRORLEVEL% NEQ 0 (
    echo Hubo un error al ejecutar 'git add .'
    exit /b %ERRORLEVEL%
)

git commit -m "Actualización de material"
IF %ERRORLEVEL% NEQ 0 (
    echo Hubo un error al ejecutar 'git commit'
    exit /b %ERRORLEVEL%
)

git push -u origin main
IF %ERRORLEVEL% NEQ 0 (
    echo Hubo un error al ejecutar 'git push'
    exit /b %ERRORLEVEL%
)
