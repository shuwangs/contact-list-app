import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom"
import LoginForm from "../LoginForm.jsx";

// mock useNavigate
const mockNavigate = vi.fn();

// // mock mockuseUser 
const mockLogin = vi.fn();
const mockRegister = vi.fn();

let mockUserContext = {
    loading: false,
    error: "",
    login: mockLogin,
    register: mockRegister
}

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        Link: ({ children, to, ...props }) => (
            <a href={to} {...props}>
                {children}
            </a>
        ),
    };
})

vi.mock("../../context/userContext.jsx", () => ({
    useUser: () => mockUserContext,
}));


describe("Login/Register Form testing", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUserContext = {
            loading: false,
            error: "",
            login: mockLogin,
            register: mockRegister,
        };
    });

    it("renders the login mode by default ", () => {
        render(<LoginForm />)
        expect(screen.getByText(/sign in to access contact dashboard/i)).toBeInTheDocument();

    })

    it("switch to the register mode ", async () => {
        const user = userEvent.setup();

        render(<LoginForm />);

        const registerBtn = screen.getByRole("button", { name: /register here/i });

        await user.click(registerBtn);
        expect(screen.getByText(/start register/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();

    })
    it("update values when user enters", async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        await user.type(screen.getByLabelText(/name/i), "bobo");
        await user.type(screen.getByLabelText(/user email/i), "bobo@example.com");

        await user.click(screen.getByRole("button", { name: /login/i }));

        expect(mockLogin).toHaveBeenCalledWith({
            name: "bobo",
            email: "bobo@example.com"
        });
    })

    it("calls register and navigates on dashboard ", async () => {
        const user = userEvent.setup();
        mockRegister.mockResolvedValue(true);
        render(<LoginForm />);
        await user.click(screen.getByRole("button", { name: /register here/i }));

        await user.type(screen.getByLabelText(/name/i), "test");
        await user.type(screen.getByLabelText(/email/i), "test@example.com");

        await user.click(screen.getByRole("button", { name: /register/i }));

        expect(mockRegister).toHaveBeenCalledWith({
            name: "test",
            email: "test@example.com"
        })

    })

})

// Reference material:https://medium.com/@rhysadler8/step-by-step-guide-to-mock-testing-in-react-41e289f89e17