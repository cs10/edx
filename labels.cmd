@echo off
SETLOCAL
echo This script creates issue labels for a GitHub repository
echo.
echo Please specify the GitHub Profile containing the Repository, e.g.:
echo https://github.com/MyProfile/MyCoolProject
echo                    ~~~~~~~~~
set /P username= "  Enter Profile   : "
echo.
echo Please specify the GitHub password for that profile:
set /P password= "  Enter Password  : "
echo.
echo Please specify the GitHub Repository, e.g.:
echo https://github.com/MyProfile/MyCoolProject
echo                              ~~~~~~~~~~~~~
echo.
set /P repository= "  Enter Repository: "
echo.
echo Creating labels ...
curl -k -u "%username%:%password%" -d "{\"name\":\"Feature\",\"color\":\"2d9e11\"}" https://api.github.com/repos/%username%/%repository%/labels
curl -k -u "%username%:%password%" -d "{\"name\":\"Bug\",\"color\":\"e10c02\"}" https://api.github.com/repos/%username%/%repository%/labels
curl -k -u "%username%:%password%" -d "{\"name\":\"Rejected\",\"color\":\"000000\"}" https://api.github.com/repos/%username%/%repository%/labels
curl -k -u "%username%:%password%" -d "{\"name\":\"Idea\",\"color\":\"e102d8\"}" https://api.github.com/repos/%username%/%repository%/labels
curl -k -u "%username%:%password%" -d "{\"name\":\"Task\",\"color\":\"0b02e1\"}" https://api.github.com/repos/%username%/%repository%/labels
curl -k -u "%username%:%password%" -d "{\"name\":\"\u2605\",\"color\":\"fffdd6\"}" https://api.github.com/repos/%username%/%repository%/labels
curl -k -u "%username%:%password%" -d "{\"name\":\"\u2605\u2605\",\"color\":\"fff875\"}" https://api.github.com/repos/%username%/%repository%/labels
curl -k -u "%username%:%password%" -d "{\"name\":\"\u2605\u2605\u2605\",\"color\":\"fff200\"}" https://api.github.com/repos/%username%/%repository%/labels
echo.
echo Current labels ...
curl -k -u "%username%:%password%" https://api.github.com/repos/%username%/%repository%/labels
ENDLOCAL
pause