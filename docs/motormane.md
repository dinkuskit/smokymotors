# MotorMane day-1 spec

MotorMane is an OpenClaw bot for the private `#smokymotors` Discord channel. On day 1, it turns a vehicle shared by an authorized associate into a DRAFT listing in the Smoky Motors EmDash `vehicles` collection. It does not answer shopper questions.

## Intake

- Listen only to members with the Discord role `MotorMane Intake` (Ryan, Joe, and Tony to start). Ignore everyone else; this gate remains required if the channel later includes customers.
- Require year, make, model, mileage, and asking price.
- Photos are optional but recommended. Suggest front, rear, and interior shots; use a placeholder image when none are provided.
- Purchase price is optional and admin-only; never show it on the public site.
- Decode a VIN when one is provided to help fill in fields.
- If required information is missing or looks wrong, ask in the same Discord thread before creating the draft.

## Output and access

Save the draft and reply with a preview link. A human publishes it in EmDash; MotorMane never publishes. People may request later changes in chat or edit the EmDash admin directly. MotorMane must not overwrite edits made in the admin.

Use a narrow EmDash credential that can create and edit drafts only in `vehicles`, with no publish rights.

## Hosting

Prove it locally on `bobbys-macbook`, inside the jellyware OpenClaw gateway alongside dinkuskong and jellymane. Then move it to production on the OpenClaw gateway on CP1.

## Deferred and dependency

Defer shopper Q&A and video intake with automatic clipping into photos. The site-steward `vehicles` collection must exist first.
