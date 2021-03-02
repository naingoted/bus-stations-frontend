import moxios from "moxios";

import { getUpDownApi } from "../actions/hookActions";

describe("moxios tests", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe("non-error response", () => {
    // create mocks for callback args
    const mockSetData = jest.fn();
    const mockSetServerError = jest.fn();
    const mockSetLoading = jest.fn();
    const secretWord = "party";

    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: secretWord,
        });
      });

      await getUpDownApi(mockSetData, mockSetServerError, mockSetLoading);
    });
    test("calls the getUpDownApi callback on axios response", async () => {
      // see whether mock was run with the correct argument
      expect(mockSetData).toHaveBeenCalledWith(secretWord);
    });
    test("calls the setLoading callback on axios response", async () => {
      // see whether mock was run with the correct argument
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
    test("does not call the setServerError callback on axios response", async () => {
      // see whether mock was run with the correct argument
      expect(mockSetServerError).not.toHaveBeenCalled();
    });
  });

  describe("5xx error response", () => {
    // create mocks for callback args
    const mockSetData = jest.fn();
    const mockSetServerError = jest.fn();
    const mockSetLoading = jest.fn();

    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
        });
      });

      await getUpDownApi(mockSetData, mockSetServerError, mockSetLoading);
    });
    test("calls the getUpDownApi callback on axios response", async () => {
      // see whether mock was run with the correct argument
      expect(mockSetServerError).toHaveBeenCalledWith("Server Error");
    });
    test("does not call the setServerError callback on axios response", async () => {
      // see whether mock was run with the correct argument
      expect(mockSetData).not.toHaveBeenCalled();
    });
  });
  describe("4xx error response", () => {
    // create mocks for callback args
    const mockSetData = jest.fn();
    const mockSetServerError = jest.fn();
    const mockSetLoading = jest.fn();

    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
        });
      });

      await getUpDownApi(mockSetData, mockSetServerError, mockSetLoading);
    });
    test("calls the getUpDownApi callback on axios response", async () => {
      // see whether mock was run with the correct argument
      expect(mockSetServerError).toHaveBeenCalledWith("Server Error");
    });
    test("does not call the setServerError callback on axios response", async () => {
      // see whether mock was run with the correct argument
      expect(mockSetData).not.toHaveBeenCalled();
    });
  });
});
