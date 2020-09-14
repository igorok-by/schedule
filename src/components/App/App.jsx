import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import './App.scss'

import CalendarView from '../CalendarView'
import Header from '../Header'
import ListView from '../ListView'
import Sidebar from '../Sidebar'
import TableView from '../TableView'
import TaskDescription from '../TaskDescription'

const App = () => {
  const [events] = useState(['Event 1', 'Event 2', 'Event 3'])
  const [mode, setMode] = useState('table')
  const [timezone, setTimezone] = useState('timezone1')

  const [mentorMode, setMentorMode] = useState(true)
  const [customColors, setCustomColors] = useState(false)
  const [clickedTask, setClickedTask] = useState(null)

  const handleModeChange = (selectedMode) => {
    console.log(`${selectedMode} mode has been selected`)
    setMode(selectedMode)
  }

  const handleTimezoneChange = (selectedTimezone) => {
    console.log(`${selectedTimezone} timezone has been selected`)
    setTimezone(selectedTimezone)
  }

  const handleTaskNameClick = (task) => {
    setMode('description')
    setClickedTask(task)
  }

  return (
    <div className="app">
      <Header mentorMode={mentorMode} setMentorMode={setMentorMode} />

      <Row>
        <Col span={8}>
          <Sidebar
            mode={mode}
            onModeChange={handleModeChange}
            timezone={timezone}
            onTimezoneChange={handleTimezoneChange}
          >
            <div>
              <Button.Group>
                <Button
                  onClick={() => setCustomColors(true)}
                  onBlur={() => setCustomColors(false)}
                >
                  <SettingOutlined />
                </Button>

                {mentorMode && (
                  <Button className="editScheduleButtonStyle">
                    <EditOutlined />
                    Edit schedule
                  </Button>
                )}
              </Button.Group>

              {customColors && <div className="customColorsStyle">colors</div>}
            </div>
          </Sidebar>
        </Col>

        <Col span={16}>
          {mode === 'calendar' && <CalendarView />}

          {mode === 'list' && <ListView onTaskNameClick={handleTaskNameClick}/>}

          {mode === 'table' && <TableView mentorMode={mentorMode} 
                                          onTaskNameClick={handleTaskNameClick}/>}
                                          
          {mode === 'description' && <TaskDescription task={clickedTask}
                                                      setClickedTask={setClickedTask}/>}
        </Col>
      </Row>
    </div>
  )
}

export default App
