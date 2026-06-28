import { expect, test } from "@playwright/test";
import { catalog } from "../../src/lib/manuscript-data";
import { readerProgressStorageKey } from "../../src/lib/reader-state";

const firstSection = catalog.sections[0];
const firstOverviewReference = catalog.overview.nodes.flatMap(
  (node) => node.references,
)[0]!;
const firstOverviewSection = catalog.sections.find(
  (section) => section.sectionId === firstOverviewReference.sectionId,
)!;

test("home page presents the overview and manuscript entry points", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "The Providence Imperative" })).toBeVisible();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://www.coherence-thesis.com/share/coherence-thesis-og.jpg",
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    "content",
    "630",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.getByRole("link", { name: /Read the overview/ })).toHaveAttribute(
    "href",
    "/overview/",
  );
  await expect(page.getByRole("link", { name: /Enter manuscript/ })).toBeVisible();
  await expect(page.getByText("five minute overview")).toBeVisible();
});

test("overview links into canonical manuscript sections", async ({ page }) => {
  await page.goto("/overview/");

  await expect(page.getByRole("heading", { name: "The Coherence Thesis" })).toBeVisible();
  await expect(page.getByRole("link", { name: /The central wound/ }).first()).toBeVisible();
  await page.getByRole("link", { name: /The central wound/ }).first().click();
  await expect(page).toHaveURL(/\/manuscripts\/providence-imperative\//);
});

test("overview references show local read checkmarks", async ({ page }) => {
  await page.addInitScript(
    ({ contentHash, key, sectionId }) => {
      window.localStorage.setItem(
        key,
        JSON.stringify({
          sections: {
            [sectionId]: {
              sectionId,
              contentHash,
              readAt: Date.now(),
              percent: 100,
            },
          },
        }),
      );
    },
    {
      contentHash: firstOverviewSection.contentHash,
      key: readerProgressStorageKey,
      sectionId: firstOverviewSection.sectionId,
    },
  );

  await page.goto("/overview/");

  const label = firstOverviewReference.label ?? firstOverviewSection.title;
  const readReference = page.locator(".reference-grid a", { hasText: label }).first();
  await expect(readReference.locator('[data-read-checkmark="true"]')).toBeVisible();
});

test("reader route exposes progress and audio controls", async ({ page }) => {
  await page.goto(firstSection.href);

  await expect(page.getByRole("heading", { name: firstSection.title })).toBeVisible();
  const breadcrumbs = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumbs.getByText("Home")).toBeVisible();
  await expect(breadcrumbs.getByText("Providence Imperative")).toBeVisible();
  await expect(breadcrumbs.getByText(firstSection.title).first()).toBeVisible();
  const progressButton = page.getByRole("button", { name: /Progress/ });
  await expect(progressButton).toBeVisible();
  await expect
    .poll(async () => {
      if ((await progressButton.getAttribute("aria-expanded")) !== "true") {
        await progressButton.click();
      }
      return progressButton.getAttribute("aria-expanded");
    })
    .toBe("true");
  await expect(page.getByRole("button", { name: /Mark read|Read/ })).toBeVisible();
  const listenButton = page.getByRole("button", { name: /Listen/ });
  await expect(listenButton).toBeVisible();
  await listenButton.click();
  await expect(page.getByLabel("Audiobook controls")).toBeVisible();
  await expect(page.getByRole("button", { name: "Play audiobook" })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Voice" })).toBeVisible();
});
