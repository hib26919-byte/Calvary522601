import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

export function useFirestore(ref, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!ref) return undefined;
    return onSnapshot(ref, (snap) => {
      setData(snap.exists?.() ? { id: snap.id, ...snap.data() } : snap.docs?.map((d) => ({ id: d.id, ...d.data() })) || fallback);
      setLoading(false);
    }, (err) => { setError(err); setLoading(false); });
  }, [ref]);
  return { data, loading, error };
}
