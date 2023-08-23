## Installing
- Navigate to the `scripts` directory
- Download desired script
- In After Effects click `File > Scripts > Install Script File...`
- Or you can copy the file into `C:\Program Files\Adobe\Adobe After Effects <version>\Support Files\Scripts`

## Shortcut
You can also add shortcut to make the experience similar to the `Premiere Pro`
Nagivate to `Edit > Keyboard Shortcuts > Search 'Ripple Delete' -> Bind to your keybind`

## Building
```bat
git clone https://github.com/joojn/After-Effects-Scripts
cd After-Effects-Scripts\src

# Link the script (Change to your version)
link.bat

# Building
npm i
npm start
```