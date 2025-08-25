#!/usr/bin/env python3
"""
AegisFlood Backend Test Script
Tests all major endpoints and functionality
"""
import requests
import json
import sys

BASE_URL = "http://127.0.0.1:8000"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            print("✓ Health check passed")
            return True
        else:
            print(f"✗ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Health check failed: {e}")
        return False

def test_auth_endpoints():
    """Test authentication endpoints"""
    try:
        # Test registration
        register_data = {
            "phone_number": "+919876543210",
            "name": "Test User",
            "language": "en",
            "location": "Test Location"
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=register_data, timeout=5)
        if response.status_code == 200:
            print("✓ User registration works")
        else:
            print(f"✗ Registration failed: {response.status_code}")
            return False

        # Test OTP verification
        verify_data = {
            "phone_number": "+919876543210",
            "otp": "0000"
        }
        response = requests.post(f"{BASE_URL}/auth/verify", json=verify_data, timeout=5)
        if response.status_code == 200:
            token_data = response.json()
            print("✓ OTP verification works")
            return token_data.get("access_token")
        else:
            print(f"✗ OTP verification failed: {response.status_code}")
            return False

    except Exception as e:
        print(f"✗ Auth test failed: {e}")
        return False

def test_admin_login():
    """Test admin login"""
    try:
        admin_data = {
            "username": "admin",
            "password": "SecureAdmin123!"
        }
        response = requests.post(f"{BASE_URL}/auth/admin/login", json=admin_data, timeout=5)
        if response.status_code == 200:
            print("✓ Admin login works")
            return response.json().get("access_token")
        else:
            print(f"✗ Admin login failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Admin login test failed: {e}")
        return False

def test_predictions():
    """Test prediction endpoints"""
    try:
        # Test prediction by location
        response = requests.get(f"{BASE_URL}/predictions/location?lat=25.5941&lon=85.1376", timeout=10)
        if response.status_code == 200:
            print("✓ Location-based prediction works")
        else:
            print(f"✗ Location prediction failed: {response.status_code}")
            return False

        return True
    except Exception as e:
        print(f"✗ Prediction test failed: {e}")
        return False

def test_api_docs():
    """Test API documentation availability"""
    try:
        response = requests.get(f"{BASE_URL}/docs", timeout=5)
        if response.status_code == 200:
            print("✓ API documentation accessible")
            return True
        else:
            print(f"✗ API docs failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ API docs test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 AegisFlood Backend Tests")
    print("=" * 40)
    
    tests_passed = 0
    total_tests = 5
    
    # Test 1: Health check
    if test_health():
        tests_passed += 1
    
    # Test 2: Authentication
    token = test_auth_endpoints()
    if token:
        tests_passed += 1
    
    # Test 3: Admin login
    admin_token = test_admin_login()
    if admin_token:
        tests_passed += 1
    
    # Test 4: Predictions
    if test_predictions():
        tests_passed += 1
    
    # Test 5: API Documentation
    if test_api_docs():
        tests_passed += 1
    
    print("\n" + "=" * 40)
    print(f"Tests Results: {tests_passed}/{total_tests} passed")
    
    if tests_passed == total_tests:
        print("🎉 All tests passed! Backend is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the output above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
