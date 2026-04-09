---
description: Log an observation for the After Action Review
---

# /aar — Log AAR Observation

Capture an observation during mission execution for the After Action Review.

## What to Do

1. **Ask the user** what they observed. If they provided text with the command, use that.

2. **Ask for the category:**
   - **Sustain** — Something that went well and should continue
   - **Improve** — Something that could be done better
   - **Action Item** — A specific follow-up task

3. **Read `site/docs/aar.md`** to understand the current format.

4. **Add the observation** to the appropriate section:

   - **Sustain** → Add to "What went well?" section
   - **Improve** → Add to "What could be improved?" section
   - **Action Item** → Add to the "Action Items" table

   Format for sustain/improve:
   ```markdown
   - {observation} *(logged YYYY-MM-DD)*
   ```

   Format for action items:
   ```markdown
   | {description} | {owner if mentioned} | | Open |
   ```

5. **Also add to the Observations section** at the bottom of the AAR:

   ```markdown
   ### YYYY-MM-DD HH:MM — {Category}

   {Full observation text}
   ```

6. **Remove placeholder text** ("No observations logged yet") when adding the first entry.

## Important

- Observations should be factual, not judgmental
- Capture what happened and why it matters
- Action items need a clear description of what needs to be done
- Don't edit existing observations — only add new ones
