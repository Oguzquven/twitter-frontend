function SearchBar() {
  return (
    <div
      style={{
        backgroundColor: "#202327",
        borderRadius: "9999px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
        border: "1px solid transparent",
        transition: "border 0.2s, background 0.2s",
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#536471">
        <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
      </svg>
      <input
        placeholder="Ara"
        style={{
          background: "none",
          border: "none",
          color: "#e7e9ea",
          fontSize: "15px",
          outline: "none",
          width: "100%",
        }}
      />
    </div>
  );
}

export default SearchBar;
