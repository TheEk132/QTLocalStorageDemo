import QtQuick 2.3
import QtQuick.Window 2.2
import QtQuick.Controls
import QtQuick.LocalStorage 2.0
import "database.js" as Storage

Window {
    visible: true
    width: 400
    height: 400
    title: qsTr("SQlite Demo")
    property var db

    Component.onCompleted: {
        //read data
        Storage.dbInit()
        Storage.readData()
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            textlabel.text = textinput.text
            Storage.storeData()
        }
    }
    TextField {
        id: textinput
        placeholderText: "Enter text here"
        anchors.centerIn: parent
    }
    Text {
        id: textlabel
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: textinput.bottom
    }
}
