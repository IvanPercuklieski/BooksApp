function TextHighlight({ text, highlight }) {
    if (!highlight) return <>{text}</>

    const escaped = highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');

    const parts = text.split(regex)

    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="bold-red">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
}

export default TextHighlight;