"""Live regression checks: python3 tests/motion_policy_test.py (preview on 8080)."""
import unittest
from playwright.sync_api import sync_playwright


class MotionPolicyTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.page = self.browser.new_page(viewport={"width": 1280, "height": 1800})
        self.page.goto("http://localhost:8080", wait_until="networkidle")

    def tearDown(self):
        self.page.close()

    def style(self, selector, prop):
        return self.page.locator(selector).first.evaluate("(el, prop) => getComputedStyle(el)[prop]", prop)

    def test_blur_only_on_small_desktop_chrome(self):
        self.assertEqual(self.style(".glass", "backdropFilter"), "none")
        self.assertEqual(self.style(".glass-subtle", "backdropFilter"), "none")
        self.assertEqual(self.style(".spatial-window", "backdropFilter"), "none")
        self.assertEqual(self.style(".spatial-dock", "backdropFilter"), "blur(8px)")

    def test_mobile_disables_3d_and_ambient_motion(self):
        self.page.set_viewport_size({"width": 390, "height": 844})
        self.page.wait_for_timeout(400)
        self.assertEqual(self.style(".spatial-dock", "backdropFilter"), "none")
        self.assertEqual(self.style(".hero-tilt", "transformStyle"), "flat")
        self.assertEqual(self.style(".photo-float", "animationName"), "none")
        self.page.mouse.move(100, 200)
        self.assertEqual(self.style(".tilt-3d", "transform"), "none")
        self.assertEqual(self.page.locator(".hero-stage").evaluate("el => el.style.getPropertyValue('--px')"), "")

    def test_transitions_are_transform_opacity_only(self):
        properties = self.page.locator("body *").evaluate_all("els => [...new Set(els.map(el => getComputedStyle(el).transitionProperty))]")
        self.assertEqual(properties, ["transform, opacity"])
        self.assertEqual(self.style(".spatial-vital", "animationName"), "vital-in")

    def test_reduced_motion_reacts_without_reload(self):
        self.page.emulate_media(reduced_motion="reduce")
        self.page.wait_for_timeout(400)
        self.assertEqual(self.style(".hero-tilt", "transform"), "none")
        self.assertEqual(self.style(".photo-float", "animationName"), "none")
        self.assertEqual(self.style(".spatial-dock", "backdropFilter"), "none")


if __name__ == "__main__":
    unittest.main()