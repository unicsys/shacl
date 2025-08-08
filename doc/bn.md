
1. Design ↔ Manufacturing

    If a part’s footprint was changed in the design stage, did manufacturing yield improve or decline compared to previous revisions?

    Which design changes reduced manufacturing rework rates across multiple plants?

    Are parts marked “preferred” in design actually the ones most used in as-built assemblies?

2. Manufacturing ↔ Testing

    Which manufacturing lots with deviations (e.g., substitute parts) passed all functional tests without issue?

    Is there a correlation between specific soldering process parameters and nets/components that later fail in testing?

    Do boards built in certain plants consistently show better/worse test pass rates for specific net types (e.g., high-speed signals)?

3. Testing ↔ Maintenance

    Do nets/components that frequently fail in production testing also have higher field failure rates after deployment?

    Are there components that pass production tests but fail disproportionately in the first year of service?

    Which recurring field issues could have been predicted from earlier test anomalies?

4. Maintenance ↔ Supply Chain

    Are replacement parts used in field repairs from the same manufacturer/vendor as the original design intent?

    Do supply shortages drive the use of substitute parts that then lead to higher field failure rates?

    Are maintenance delays linked to long lead times or low inventory of specific parts?

5. Design ↔ Maintenance (Long-Term Feedback)

    Which design choices (footprint, vendor selection, part class) lead to the lowest lifetime sustainment cost?

    Are parts with certain lifecycle scores in design correlated with shorter or longer mean time between failures (MTBF) in service?

    Which schematic nets are most frequently involved in long-term failures, and can design rerouting eliminate the issue?

Why these matter

These questions:

    Span multiple lifecycle stages (design → build → test → sustainment).

    Require linking entities across data silos (e.g., a part’s CPN in PLM, the same part in ERP inventory, its pins/nets in CAD, its failure records in maintenance logs).

    Allow reasoning over time — not just point-in-time lookup.

    Can feed prescriptive actions (design changes, vendor switch, stocking strategy).

If you’d like, I can map these into a “Lifecycle Traceability Matrix”:

    Rows = Lifecycle stage connections (Design→Manufacturing, Manufacturing→Testing, etc.)

    Columns = Descriptive, Diagnostic, Predictive, Prescriptive

    Highlight = Which require inference reasoning and which are direct lookups.

That would make the “ontology advantage” very visible for your meeting.
