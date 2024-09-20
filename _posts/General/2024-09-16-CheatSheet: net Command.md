---
title: "Cheat Sheet: net Command"
description: "The net command is a command-line tool that enables the management and configuration of various services and network resources. This cheat sheet includes the net commands that I find particularly useful."
date: 2024-09-15 12:00:00
categories: [General, CheatSheet]
tags: ["User Enumeration", "Windows Enumeration", "System Enumeration"]
mermaid: true
image:
  path: "/assets/img/General/CheatSheet: net Command/icon.png"
  alt: Reference Icon
---

---

## **net user**

The `net user` command will allow us to perform user-related operations, such as listing users and managing users.
You can use `/domain` flag in to perform these operations at a domain level.

> ### **net user**
>
> Shows the local system accounts.

##### **Example**

```
C:\Users\Juan>net user

User accounts for \\DESKTOP-IPQ48E2

-------------------------------------------------------------------------------
Administrator            DefaultAccount           Guest
Juan                     Pablo                    WDAGUtilityAccount
The command completed successfully.
```

> ### **net user \<user\>**
>
> Shows detailed user information.

##### **Example**

```
C:\Windows\system32>net user administrator
User name                    Administrator
Full Name
Comment                      Built-in account for administering the computer/domain
User's comment
Country/region code          000 (System Default)
Account active               No
Account expires              Never

Password last set            9/17/2024 4:42:49 PM
Password expires             Never
...
The command completed successfully.
```

> ### **net user \<user\> \<password\>**
>
> Changes the user's password.

##### **Example**

```
C:\Windows\system32>net user Pablo "Password123"
The command completed successfully.
```

> ### **net user \<user\> \<password\> /add**
>
> Creates a new user with the specified password.

##### **Example**

```
C:\Windows\system32>net user "Pepe" "pepelotas_69" /add
The command completed successfully.
```

> ### **net user \<user\> /delete**
>
> Deletes the specified user.

##### **Example**

```
C:\Windows\system32>net user Pepe /delete
The command completed successfully.
```

> ### **net user \<user\> /active:<yes|no>**
>
> Enables or disables a user.

##### **Example**

```
C:\Windows\system32>net user Pepe /active:no
The command completed successfully.


C:\Windows\system32>net user Pepe /active:yes
The command completed successfully.
```

### **Summary**

------------------------|
| **Command** | **Description** |
|`net user` | Shows local system accounts.|
|`net user <user>`| Displays detailed information about a specific user.|
|`net user <user> <password>`| Changes the specified user's password.|
|`net user <user> <password> /add` |Creates a new user with the specified password.|
|`net user <user> /delete	`|Deletes the specified user from the system.|
|`net user <user> /active:<yes	no>`|Activates or deactivates a user|

---

## **net localgroup**

The `net localgroup` command is used for local group management.

> ### **net localgroup**
>
> Shows existing local groups.

##### Example

```
C:\Windows\system32>net localgroup

Aliases for \\DESKTOP-IPQ48E2

-------------------------------------------------------------------------------
*Access Control Assistance Operators
*Administrators
*Backup Operators
*Cryptographic Operators
*Device Owners
*Distributed COM Users
*Event Log Readers
*Users
...
The command completed successfully.
```

---

> ### **net localgroup \<group\>**
>
> Shows group members

###### Example

```
C:\Windows\system32>net localgroup Users
Alias name     Users
Comment        Users are prevented from...

Members

-------------------------------------------------------------------------------
NT AUTHORITY\Authenticated Users
NT AUTHORITY\INTERACTIVE
Pepe
The command completed successfully.


C:\Windows\system32>net localgroup Administrators
Alias name     Administrators
Comment        Administrators have complete and unrestricted access to the computer/domain

Members

-------------------------------------------------------------------------------
Administrator
Juan
The command completed successfully.
```

---

> ### **net localgroup \<group\> /add**
>
> Creates a new group

###### Example

```
C:\Windows\system32>net localgroup "IT Support" /ADD
The command completed successfully.
```

---

> ### **net localgroup \<group\> /delete**
>
> Deletes the specified group

##### **Example**

```
C:\Windows\system32>net localgroup "IT Support" /DELETE
The command completed successfully.
```

---

> ### **net localgroup \<group\> \<user\> /add**
>
> Add a user to a group

##### **Example**

```
C:\Windows\system32>net localgroup "IT Support" "Pepe" /add
The command completed successfully.
```

---

> ### **net localgroup \<group\> \<user\> /delete**
>
> Deletes a user from a group.

##### **Example**

```
C:\Windows\system32>net localgroup "IT Support" "Pepe" /delete
The command completed successfully.
```

---

### **Summary**

-------------------------------------------------------------------------------|
| **Command** | **Description**|
| `net localgroup` | Shows the local groups on the system. |
| `net localgroup <group>` | Displays members of a specific group. |
| `net localgroup <group> /add` | Creates a new local group. |
| `net localgroup <group> /delete` | Deletes a local group. |
| `net localgroup <group> <user> /add` | Adds a user to a local group. |
| `net localgroup <group> <user> /delete` | Removes a user from a local group.|

---

## **net use**

It allows to manage network resources, such as network drives, folders, and printers.

> ### **net use**
>
> When used without any parameters, it displays all currently connected network resources on the local system.

##### **Example**

```
PS C:\Windows\system32> net use
New connections will be remembered.


Status       Local     Remote                    Network

-------------------------------------------------------------------------------
Disconnected E:        \\192.168.3.69\test       Microsoft Windows Network
             S:        \\VBoxSvr\Shared          VirtualBox Shared Folders
Disconnected X:        \\192.168.100.6\Logs      Microsoft Windows Network
The command completed successfully.
```

> ### **net use \<drive letter\> \\\\\<host\>\\<share\>** /user:<user> password
>
> Maps a network shared resource to the specified drive letter, allowing access with the provided credentials if required.

##### **Example**

```
PS C:\Windows\system32> net use X: \\192.168.100.6\Logs /user:Pepe pepe12345
The command completed successfully.

C:\Windows\system32> Get-ChildItem X:

Directory: X:\

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         9/18/2024  10:24 AM              0 access.log
-a----         9/18/2024  10:24 AM              0 error.log
```

> ### **net use \<drive letter\> /delete**
>
> Deletes the specified network drive, unmapping the share resource.

##### **Example**

```
PS C:\Windows\system32> net use X: /delete
X: was deleted successfully.
```

### **Summary**

-------------------------------------------------------------------------------|
| **Command** | **Description**|
| `net use` | Displays all currently connected network resources on the local system. |
| `net use \\<drive letter\> \<host\>\<share>` | Maps a network shared resource to the specified drive letter|
|`net use <drive letter> /delete`|Deletes the specified network drive, unmapping the share resource.|

---

## **net share**

The net share command is used to create, delete, or manage shared resources on a Windows system.

> ### **net share**
>
> When used without parameters, shows the local shared resources.

##### Example

```
C:\Users\Juan>net share

Share name   Resource                        Remark

-------------------------------------------------------------------------------
C$           C:\                             Default share
IPC$                                         Remote IPC
ADMIN$       C:\Windows                      Remote Admin
Shared Folder
             C:\Users\Juan\Desktop\Shared Folder

test         C:\Users\Juan\Test
Users        C:\Users
The command completed successfully
```

> ### **net share \<share\>**
>
> Displays detailed information about the specified shared resource.

##### Example

```
C:\Windows\system32>net share C$
Share name        C$
Path              C:\
Remark            Default share
Maximum users     No limit
Users
Caching           Manual caching of documents
Permission        Everyone, FULL

The command completed successfully.
```

> ### **net share \<share name\>=\<drive\>:\<path\> /grant:\<user\>,\<[read,change,full]\>**
>
> Creates a new shared resource mapped to the provided path.

##### Example

```
C:\Windows\system32>net share SharedMusic=C:\Users\Juan\Music
SharedMusic was shared successfully.


C:\Windows\system32>net share

Share name   Resource                        Remark

-------------------------------------------------------------------------------
C$           C:\                             Default share
IPC$                                         Remote IPC
ADMIN$       C:\Windows                      Remote Admin
SharedMusic  C:\Users\Juan\Music <=
test         C:\Users\Juan\Test
Users        C:\Users
The command completed successfully.
```

> ### **net share \<share\> /delete**
>
> Removes the specified shared resource.

##### Example

```
C:\Windows\system32>net share SharedMusic /delete
SharedMusic was deleted successfully.
```

### **Summary**

---------------------------------|
| **Command** | **Description** |
| `net share` |Shows the local shared resources|
|`net share <share>`|Displays detailed information about the specified shared resource|
|`net share <share name>=<drive>:<path>`|Creates a new shared resource mapped to the provided path|
|`net share <share> /delete`|Removes the specified shared resource|

---

## **net view**

The net view command displays a list of computers or shared resources in a specified network. It can show shared folders and printers on a remote computer or provide information about all computers on the network.

> ### **net view**
>
> When used without parameters, displays a list of computers in the current domain

##### Example

```
PS C:\Users\julio> net view
Server Description

---

\\DC01
\\WS01
The command completed successfully.
```

> ### **net view \\\\\<ComputerName\>**
>
> Displays a list of shared resources in the specified computer.
> /all parameter will also show $ shares.

##### Example

```
PS C:\Users\julio> net view \\WS01 /ALL
Shared resources on \\WS01

Shared Resource Name    Type   Used as     Comment
-------------------------------------------------------------------------------
ADMIN$                  Disk               Remote Admin
C$                      Disk               Default share
IPC$                    IPC                Remote IPC
SharedMovies            Disk
The command completed successfully.

```

### **Summary**

---------------------------------|
| **Command** | **Description** |
|net view|When used without parameters, displays a list of computers in the current domain|
|net view \\\\\<ComputerName\>|Displays a list of shared resources in the specified computer.|

---

## **net file**

The net file command is used to manage open files on a shared resource. It allows users to view and close files that are currently open by users on a network share.

> ### **net file**
>
> Displays a list of open files on a server and the users who have them open.

##### Example

```
PS C:\Users\julio> net file
Open File                   User Name          # Locks
---------------------------------------------------------------------
\\DC01\SharedDocs\Report.docx   user1              1
\\DC01\SharedDocs\Image.png     user2              2
The command completed successfully.
```

> ### **net file \\\\\<ID\>**
>
> Closes an open file by specifying its ID number.

##### Example

```
PS C:\Users\julio> net file 123 /close
The file was closed successfully.
```

### **Summary**

---------------------------------|
| **Command** | **Description** |
| net file | Displays a list of open files on a server and the users who have them open. |
| net file \\\\\<ID\> | Closes an open file by specifying its ID number. |

---

## **Basic Service Management**

> ### **net start**
>
> When used without parameter, it displays all initialized services in the local system.

##### Example

```
C:\Users\Juan>net start
These Windows services are started:

   Application Information
   AppX Deployment Service (AppXSVC)
   AVCTP service
   Background Intelligent Transfer Service
   Background Tasks Infrastructure Service
   Base Filtering Engine
   Capability Access Manager Service
   Client License Service (ClipSVC)
   Clipboard User Service_31ef7
   CNG Key Isolation
   COM+ Event System
   ...
```

> ### **net start \<ServiceName\>**
>
> Starts the specified service.

##### Example

```
C:\Windows\system32>net start "Themes"
The Themes service is starting.
The Themes service was started successfully.
```

> ### **net stop \<ServiceName\>**
>
> Stops the specified service

##### Example

```
C:\Windows\system32>net stop "Themes"
The Themes service is stopping.
The Themes service was stopped successfully.
```

> ### **net pause \<ServiceName\>**
>
> Pauses the specified service

##### Example

```
C:\Windows\system32>net pause "Print Spooler"
The Print Spooler service is pausing.
The Print Spooler service was paused successfully.
```

> ### **net continue \<ServiceName\>**
>
> Resumes a paused service

```
C:\Windows\system32>net continue "Print Spooler"
The Print Spooler service is resuming.
The Print Spooler service was continued successfully.
```

### **Summary**

---------------------------------------------------------------|
| **Command** | **Description** |
|`net start`|Displays all initialized services in the local system.|
|`net start \<ServiceName\>`|Starts the specified service|
|`net stop \<ServiceName\>`| Stops the specified service|
|`net pause \<ServiceName\>`|Pauses the specified service|
|`net continue \<ServiceName\>`|Resumes a paused service|

---
