import {render, screen} from "@testing-library/react"
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom"
import { TestEnvironment } from "jest-environment-jsdom"

test("testing that the BodySectionWithMarginBottom component contains a div with the class bodySectionWithMargin", () => {
    render(<BodySectionWithMarginBottom/>)
    const elem = screen.getByRole("bswm")
    expect(elem).toBeInTheDocument()
})

test("testing that the BodySectionWithMarginBottom component renders the BodySection component", () => {
    render(<BodySectionWithMarginBottom/>)
    const elem = screen.getByRole("bs")
    expect(elem).toBeInTheDocument()
})
