import { expect, test } from 'vitest'
import Register from '../pages/Register'
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"




test('should work as expected', () => {
  render (
    <MemoryRouter>
      <Register/>
    </MemoryRouter>
  )

  const submitBtn = screen.getByRole('button',{name:/sign up/i})
  fireEvent.click(submitBtn)

  const username = screen.getByPlaceholderText("Enter your username")
  fireEvent.change(username,{target:{value:"jasirp"}})

  const email = screen.getByPlaceholderText("Enter your email")
  fireEvent.change(email,{target:{value:"jazjasir7@gmail.com"}})

  expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();

})