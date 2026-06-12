# 10. Non-Functional Testing Checklist

**Project:** Vendor Bill & Payment Hub
**Document Type:** Non-Functional Testing Checklist
**Version:** 1.0

---

Functional testing answers *"does it do what it should?"* — this checklist answers *"does it hold up under real conditions?"* It covers performance, security, accessibility, compatibility, usability, and documentation.

## Performance

| Check | Result |
|-------|--------|
| Bill list loads in under 3 seconds with 500+ records | ☐ Pass ☐ Fail ☐ N/A |
| Bill-submission API responds in under 2 seconds at normal load | ☐ Pass ☐ Fail ☐ N/A |
| System handles 500 concurrent users without degradation (JMeter) | ☐ Pass ☐ Fail ☐ N/A |
| Monthly report generates in under 10 seconds for one month of data | ☐ Pass ☐ Fail ☐ N/A |

## Security

| Check | Result |
|-------|--------|
| SQL-injection attempt on sign-in returns an error, never data | ☐ Pass ☐ Fail ☐ N/A |
| XSS payload in the bill-notes field is sanitised, not rendered | ☐ Pass ☐ Fail ☐ N/A |
| Every API endpoint returns 401 without a valid auth token | ☐ Pass ☐ Fail ☐ N/A |
| Upload rejects disguised executables (e.g., `.exe` renamed to `.pdf`) | ☐ Pass ☐ Fail ☐ N/A |
| Session tokens expire on sign-out and after idle timeout | ☐ Pass ☐ Fail ☐ N/A |
| Passwords and bank details never appear in server logs | ☐ Pass ☐ Fail ☐ N/A |
| Direct-URL access to a higher-privilege route is blocked (RBAC) | ☐ Pass ☐ Fail ☐ N/A |

## Accessibility (WCAG 2.1 AA)

| Check | Result |
|-------|--------|
| All form inputs have associated accessible labels | ☐ Pass ☐ Fail ☐ N/A |
| The hub is fully navigable by keyboard alone | ☐ Pass ☐ Fail ☐ N/A |
| Error-message text meets the 4.5:1 contrast ratio | ☐ Pass ☐ Fail ☐ N/A |

## Compatibility

| Check | Result |
|-------|--------|
| Renders correctly on Chrome, Firefox, Edge, and Safari | ☐ Pass ☐ Fail ☐ N/A |
| Responsive and usable on mobile and tablet viewports | ☐ Pass ☐ Fail ☐ N/A |

## Usability

| Check | Result |
|-------|--------|
| Error messages are descriptive and guide the user to a fix | ☐ Pass ☐ Fail ☐ N/A |
| A vendor can complete a bill submission in under 5 minutes unaided | ☐ Pass ☐ Fail ☐ N/A |

## Documentation

| Check | Result |
|-------|--------|
| All displayed error messages match the documented error catalogue | ☐ Pass ☐ Fail ☐ N/A |
| User-guide instructions match the actual UI for every vendor flow | ☐ Pass ☐ Fail ☐ N/A |
