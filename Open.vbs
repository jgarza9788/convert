'used to quicky open a cmd window for this project'

'create a shell to run cmd
Dim objShell
Set objShell = WScript.CreateObject ("WScript.shell")

Dim strPath
strPath = Wscript.ScriptFullName

Dim objFSO
Set objFSO = CreateObject("Scripting.FileSystemObject")

Dim objFile
Set objFile = objFSO.GetFile(strPath)

Dim strFolder
strFolder = objFSO.GetParentFolderName(objFile) 

objShell.Run "cmd"
WScript.Sleep(100)
objShell.SendKeys "cd " + strFolder
objShell.SendKeys "{ENTER}"
objShell.SendKeys "code " + strFolder
objShell.SendKeys "{ENTER}"


WScript.Quit
