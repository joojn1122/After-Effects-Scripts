# After Effects Scripts
#### [Ripple Shift](/scripts/Ripple%20Shift.jsx)
*Takes all selected layers and shifts them to the closest clip*

#### [Ripple delete](/scripts/Ripple%20Delete.jsx)
*Removes all the selected layers, and shifts all the layers after to the closest clip*

## Installing
- Navigate to the `scripts` directory
- Download desired script
- In After Effects click `File > Scripts > Install Script File...`
- Or you can copy the script file into `C:\Program Files\Adobe\Adobe After Effects <version>\Support Files\Scripts`

## Shortcut
You can also add script shortcut to make the experience similar to the `Premiere Pro`
Nagivate to `Edit > Keyboard Shortcuts > Search '<Script Name>' -> Bind to your keybind`

## Building
```bat
git clone https://github.com/joojn/After-Effects-Scripts
cd After-Effects-Scripts\src

: Link the script (Edit to your version)
link.bat

: Building
npm i
npm start
```