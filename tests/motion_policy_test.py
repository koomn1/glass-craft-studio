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

    def test_mobile_pointer_parallax_is_restored(self):
        self.page.set_viewport_size({"width": 390, "height": 844})
        self.page.wait_for_timeout(400)
        self.page.mouse.move(100, 200)
        self.page.wait_for_timeout(400)
        self.assertNotEqual(self.page.locator(".hero-stage").evaluate("el => el.style.getPropertyValue('--px')"), "")

    def test_reduced_motion_reacts_without_reload(self):
        self.page.emulate_media(reduced_motion="reduce")
        self.page.wait_for_timeout(400)
        self.assertEqual(self.style(".hero-tilt", "transform"), "none")
        self.assertEqual(self.style(".photo-float", "animationName"), "none")
        self.assertEqual(self.style(".spatial-dock", "backdropFilter"), "none")


if __name__ == "__main__":
    unittest.main()