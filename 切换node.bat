@echo off
FOR /F "tokens=*" %%i IN ('node --version') DO SET CURRENT_NODE_VERSION=%%i
echo Current Node version: %CURRENT_NODE_VERSION%

IF "%CURRENT_NODE_VERSION%"=="v14.21.2" (
    nvm use 20.10.0
) ELSE (
    nvm use 14.21.2
)

IF ERRORLEVEL 1 (
    echo An error occurred!
    pause
)

