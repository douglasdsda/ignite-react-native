import { AuthProvider, useAuth } from "./auth";
import { mocked } from "ts-jest/utils";
import { renderHook, act } from "@testing-library/react-hooks";
import { logInAsync } from 'expo-google-app-auth'
jest.mock("expo-google-app-auth");

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existed", async () => {
    const googleMocked = mocked(logInAsync as any);
    // googleMocked.mockReturnValue({ // compartilha o estados com os demais forem exec depois
    googleMocked.mockReturnValueOnce({ // nao salta o estado de retorno desse mock
      type: "success",
      user: {
        id: "any_id",
        email: "jonh_doe@example.com",
        name: "John Doe",
        photo: "any_photo.png",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoogle());
 
    // expect(result.current.user.id).toBeTruthy();
    expect(result.current.user.email).toBe('jonh_doe@example.com');
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoogle());
 
    // expect(result.current.user.id).toBeTruthy();
    expect(result.current.user).not.toHaveProperty('id');
  });
 
  it("should be error with incorrecly Google parameters", async () => {
   

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
     try {
      await act(() => result.current.signInWithGoogle());
     } catch (error) {
      expect(result.current.user).toThrowError();
     }
 
  
  
  });
 
 

});
