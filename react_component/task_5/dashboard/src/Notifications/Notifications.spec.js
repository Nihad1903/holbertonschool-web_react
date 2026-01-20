import Notifications from './Notifications.jsx'
import { render, screen } from '@testing-library/react'
import { v4 as uuidv4 } from 'uuid'
import { getLatestNotification } from '../utils/utils.js'
import userEvent from '@testing-library/user-event'


test("if the displayDrawler is false", () => {
    render(<Notifications notifications={[]} displayDrawer={false}/>)
    const p = screen.getByRole("paragraph")
    expect(p).toBeInTheDocument()
    const btn = screen.queryByRole("button")
    expect(btn).toBeNull()
})

test("if the displayDrawler is true and the list is not empty", () => {
    render(<Notifications notifications={[{id: uuidv4(), type: "default", value: "New course available"}, {id: uuidv4(), type: "urgent", value: "New resume available"}, {id: uuidv4(), type: "urgent", HTML: getLatestNotification()}]} displayDrawer={true}/>)
    const p = screen.getAllByRole("paragraph")
    expect(p.length).toBe(2)
    const btn = screen.queryByRole("button")
    expect(btn).toBeInTheDocument()
    const li = screen.getAllByRole("listitem")
    expect(li.length).toBe(3)
    // equal to the list length
})

test("if the displayDrawler is true and the list is empty", () => {
    render(<Notifications notifications={[]} displayDrawer={true}/>)
    const text = screen.getByText("No new notification for now")
    expect(text).toBeInTheDocument()
})

test("if the message Notification {id} has been marked as read is logged", async () => {
    const logMock = jest.spyOn(console, 'log').mockImplementation(() => {})
    const mockedFunc = jest.fn().mockImplementation(() => {console.log(`Notification 123 has been marked as read`)})
    render(<Notifications notifications={[{id: uuidv4(), type: "default", value: "New course available"}, {id: uuidv4(), type: "urgent", value: "New resume available"}, {id: uuidv4(), type: "urgent", HTML: getLatestNotification()}]} displayDrawer={true}/>)
    console.log(screen.getAllByRole("listitem"))
    const userE = userEvent.setup()
    let itemsArray = screen.getAllByRole("listitem")
    await userE.click(itemsArray[0])
    expect(logMock).toBeCalled()
    jest.clearAllMocks()
})

test("Checking that the Notifications component doesn't re-render if the length of the notifications prop remains the same", () => {
    const MockedFunc = jest.spyOn(console, "log").mockImplementation(() => {})
    let {rerender} = render(<Notifications notifications={[{id: uuidv4(), type: "default", value: "New course available"}, {id: uuidv4(), type: "urgent", value: "New resume available"}, {id: uuidv4(), type: "urgent", HTML: getLatestNotification()}]} displayDrawer={true}/>)
    expect(MockedFunc).toHaveBeenCalled()
    jest.clearAllMocks()
    rerender(<Notifications notifications={[{id: uuidv4(), type: "default", value: "New course available"}, {id: uuidv4(), type: "urgent", value: "New resume available"}, {id: uuidv4(), type: "urgent", HTML: getLatestNotification()}]} displayDrawer={true}/>)
    expect(MockedFunc).not.toHaveBeenCalled()
    jest.clearAllMocks()
})

test("Checking that the Notifications component doesn't re-render if the length of the notifications prop remains the same", () => {
    const MockedFunc = jest.spyOn(console, "log").mockImplementation(() => {})
    let {rerender} = render(<Notifications notifications={[{id: uuidv4(), type: "default", value: "New course available"}, {id: uuidv4(), type: "urgent", value: "New resume available"}, {id: uuidv4(), type: "urgent", HTML: getLatestNotification()}]} displayDrawer={true}/>)
    expect(MockedFunc).toHaveBeenCalled()
    jest.clearAllMocks()
    rerender(<Notifications notifications={[{id: uuidv4(), type: "urgent", value: "New resume available"}, {id: uuidv4(), type: "urgent", HTML: getLatestNotification()}]} displayDrawer={true}/>)
    expect(MockedFunc).toHaveBeenCalled()
    jest.clearAllMocks()
})
