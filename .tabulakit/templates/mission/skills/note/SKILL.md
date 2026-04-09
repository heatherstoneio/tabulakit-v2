---
description: Add a timestamped communication entry to the comms log
---

# /note — Communication Log Entry

Add a timestamped entry to the communications log (`site/comms.md`).

## What to Do

1. **Ask the user** what they want to log. If they provided text with the command, use that.

2. **Read `site/comms.md`** to understand the current format.

3. **Add the entry** at the top of the log (after the header and tip), in this format:

```markdown
### YYYY-MM-DD HH:MM

{User's note content}
```

4. **Check for related pages** that might need updating. Read `site/_sidebar.md` to see what pages exist, then consider:

   - Does this note mention a **date or schedule change**? → Offer to update `site/timeline.md`
   - Does this note mention a **person or role**? → Offer to update `site/roster.md`
   - Does this note mention a **risk or safety concern**? → Offer to update `site/risk.md`
   - Does this note mention an **external contact**? → Offer to update `site/contacts.md`
   - Does this note answer an **open RFI**? → Offer to update `site/rfi.md`
   - Does this note contain a **decision or change to the plan**? → Offer to update `site/docs/frago.md`

5. **Ask the user** if they want to propagate to any of the related pages you identified. Only suggest pages that genuinely seem relevant — don't suggest all of them every time.

6. **Make the updates** if the user agrees.

## Important

- Always use the current date/time for the timestamp
- Newest entries go at the top (reverse chronological)
- Keep entries concise but complete
- If the comms.md file has a "No entries yet" placeholder, remove it when adding the first entry
