const { app, Tray, Menu, nativeImage, powerSaveBlocker } = require('electron');
const { execFile } = require('child_process');
const path = require('path');

let tray = null;
let powerSaveBlockerId = null;
let activityInterval = null;

// Ícone base64 16x16 - círculo verde simples
const iconBase64 = `data:image/png;base64,
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGHSURBVDiNpZK9SgNBFIXPnU02m91EF4IQFBsrEUVIYWMhVjY+gA+RN7DxFXwBsRQFwUoQBAtBJJW/hYVg/IlRUBORJCab3Z0ZC7MxJGvhB7eYc+fjzh0G+E+xAPD4vHmbTCYOAJj/gHuFQuF6cXn1gnHOr6qX510AcF0XnuflAawA0AAYpZR3giC4abVaJ5zzk3K5/DQDEBFc130TQuy1Wq2g2+2u53K5U8bYkRBiKwzD90ajsQfgfQYAAMaYBqBQLBZ3M5nMheu6myMQY2wUhuFBvV7fB/D4ayDGABH1iQhSyil4aklEfSklGGNTwBTAGAMRgYj6UsqpcUopEFGfiHpE1JdSTgGmaYIxNgVMbmitX7XWL1rrtNZ6pLUGEYGIoLWG1hpKKXDOf8wA3W73Q0pZjeN4O47jWhzHtTiOD+M4rsVxvD0ejz+01h9/fuP09kwIUdVav1JK7yml7qWUD0qpJ6XUo1LqWQixWSwWq7Za7f0Y+Lt9ApctHF4dVqnBAAAAAElFTkSuQmCC`;

app.whenReady().then(() => {
    console.log('App is ready!');

    // Criar ícone nativo a partir do base64
    const icon = nativeImage.createFromDataURL(iconBase64);

    // Criar tray com o novo ícone
    tray = new Tray(icon);
    console.log('Tray icon created');

    // Iniciar bloqueio de economia de energia
    powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
    console.log('Power save blocker started:', powerSaveBlocker.isStarted(powerSaveBlockerId));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Status: Running',
            enabled: false
        },
        { type: 'separator' },
        {
            label: 'Sair',
            click: () => {
                if (powerSaveBlockerId !== null) {
                    powerSaveBlocker.stop(powerSaveBlockerId);
                }
                app.quit();
            }
        }
    ]);

    tray.setToolTip('Windows Keep On');
    tray.setContextMenu(contextMenu);
    console.log('App running in system tray');

    // Estratégia 1: PowerSaveBlocker
    if (!powerSaveBlockerId || !powerSaveBlocker.isStarted(powerSaveBlockerId)) {
        powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
        console.log('Power save blocker started');
    }

    // Estratégia 2: Executar comando nativo do Windows
    if (process.platform === 'win32') {
        execFile('powershell', [
            '-command',
            'Add-Type -AssemblyName System.Windows.Forms;' +
            '[System.Windows.Forms.Application]::SetSuspendState("None", $false, $false)'
        ]);
    }

    // Estratégia 3: Chamar preventSleep periodicamente
    if (!activityInterval) {
        activityInterval = setInterval(() => {
            // Estratégia 1: PowerSaveBlocker
            if (!powerSaveBlockerId || !powerSaveBlocker.isStarted(powerSaveBlockerId)) {
                powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
                console.log('Power save blocker started');
            }

            // Estratégia 2: Executar comando nativo do Windows
            if (process.platform === 'win32') {
                execFile('powershell', [
                    '-command',
                    'Add-Type -AssemblyName System.Windows.Forms;' +
                    '[System.Windows.Forms.Application]::SetSuspendState("None", $false, $false)'
                ]);
            }
        }, 30000); // A cada 30 segundos
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});