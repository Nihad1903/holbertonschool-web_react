import {render, screen} from "@testing-library/react"
import BodySection from "./BodySection"

test("testing that the BodySection component renders a heading with the title prop value", () => {
    render(<BodySection title="TEST-TITLE"></BodySection>)
    const heading = screen.getByText("TEST-TITLE")
    expect(heading).toBeInTheDocument()
})

test("testing that the BodySection component renders any number of children passed to it", () => {
    render(<BodySection><p>para1</p><p>para2</p></BodySection>)
    const p1 = screen.getByText("para1")
    const p2 = screen.getByText("para2")
    expect(p1).toBeInTheDocument()
    expect(p2).toBeInTheDocument()
})
