/* eslint-disable no-undef */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import GameEntry from "../components/gamesList/GameEntry.jsx";

const mockGameData = {
  id: 1,
  name: "Test",
  cover: { id: 1, url: "cover_url.jpg" },
  platforms: [{ id: 1, name: "Test Platform" }],
  involved_companies: [{ id: 1, company: { id: 1, name: "Test Company" } }],
  release_dates: [
    {
      date: Date.now(),
      human: "Januady 2022",
      platform: {
        id: 1,
        name: "Test Platform",
        platform_logo: {
          id: 1,
          url: "platform_logo_url.jpg",
        },
      },

    },
  ],
};

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Render empty must return dummy", () => {
  expect(render(<GameEntry />, container)).toBe(render(<GameEntry metadata={({ dummy: true })} />, container));
});

it("Render mock metadata", () => {
  act(() => {
    render(<GameEntry metadata={mockGameData} />, container);
  });
});

it("Render missing cover", () => {
  act(() => {
    render(<GameEntry metadata={({
      id: 1,
      name: "Test",
      platforms: mockGameData.platforms,
      involved_companies: mockGameData.platforms,
      release_dates: mockGameData.release_dates,
    })}
           />, container);
  });
});

it("Render missing name", () => {
  act(() => {
    render(<GameEntry metadata={({
      id: 1,
      cover: mockGameData.cover,
      platforms: mockGameData.platforms,
      involved_companies: mockGameData.platforms,
      release_dates: mockGameData.release_dates,
    })}
           />, container);
  });
});

it("Render missing platforms", () => {
  act(() => {
    render(<GameEntry metadata={({
      id: 1,
      name: "Test",
      cover: mockGameData.cover,
      involved_companies: mockGameData.platforms,
      release_dates: mockGameData.release_dates,
    })}
           />, container);
  });
});

it("Render missing ID", () => {
  act(() => {
    render(<GameEntry metadata={({
      name: "Test",
      cover: mockGameData.cover,
      platforms: mockGameData.platforms,
      involved_companies: mockGameData.platforms,
      release_dates: mockGameData.release_dates,
    })}
           />, container);
  });
});
