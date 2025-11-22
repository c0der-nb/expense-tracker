import { config } from "../App";

const API_URL = config.endpoint;

class ApiService { 
    static async login(loginForm) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        });
        return response;
    }

    static async register(registerForm) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerForm)
        });
        return response;
    }

    static async getAllExpenses() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/expense`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response;
    }

    static async addExpense(expenseData) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(expenseData)
        });
        return response;
    }

    static async updateExpense(expenseId, expenseData) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/expense/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(expenseData)
        });
        return response;
    }

    static async deleteExpense(expenseId) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/expense/${expenseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }

    static async getWalletBalance() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/user/wallet_balance`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response;
    }

    static async addWalletBalance(amount) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/user/wallet_balance`, {
            method: 'POST',
            body: JSON.stringify({wallet_balance: parseInt(amount)}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }
}

export default ApiService;
