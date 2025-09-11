import { expect,test } from "vitest";
import { render,screen,fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom";


test("testing login page",()=>{

    render(<MemoryRouter>
        <Login/>
    </MemoryRouter>)


    const SubmitBtn = screen.getByRole('button',{name:/sign in/i})
    fireEvent.click(SubmitBtn)

    expect(screen.getByText(/username is required/i))
    expect(screen.getByText(/password is required/i))


})