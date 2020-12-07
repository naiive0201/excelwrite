const { app, BrowserWindow } = require('electron')
const Promise = require('bluebird')
const AppDAO = require('./data/dao')
const CustomerRepository = require('./data/CustomerRepository')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
}

function main () {
  const dao = new AppDAO('./data/customers.db')
  const data = {
    name: '주현수',
    phone: '010-2539-2913',
    address: '충북 음성군 감곡면 영산리 535-2',
    boxes: 2,
    tags: 1,
    memo: '순:002',
    createdAt: '2020-12-08',
    sendedAt: '2020-12-10'
  }
  const customerRepo = new CustomerRepository(dao)
  customerRepo.create(data)
    .then(() => customerRepo.getAll())
    .then((data) => console.log(data))
}

app.whenReady().then(main).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
