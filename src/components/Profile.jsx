import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { QRCodeCanvas } from "qrcode.react";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const qrRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/register");
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserData({ ...snap.data(), email: user.email });
      }

      setLoading(false);
    });

    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/register");
  };

  // ✅ TEXT THAT WILL OPEN IN NOTEPAD / NOTES
  const qrText = userData
    ? `ZORPHIX USER PROFILE

Name: ${userData.name}
Email: ${userData.email}
College: ${userData.college}
Department: ${userData.department}
Phone: ${userData.phone}
Year: ${userData.year}
`
    : "";

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "zorphix-user-profile-qr.png";
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="max-w-5xl w-full bg-[#111] border border-white/10 rounded-xl p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT – PROFILE DETAILS */}
        <div>
          <button
            onClick={() => navigate("/")}
            className="mb-6 text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to Home
          </button>

          <div className="flex items-center gap-6 mb-8">
            <img
              src={userData.photoURL || "/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border border-[#e33e33]"
            />
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-400">{userData.email}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <Detail label="College" value={userData.college} />
            <Detail label="Department" value={userData.department} />
            <Detail label="Phone" value={userData.phone} />
            <Detail label="Year" value={userData.year} />
          </div>

          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-[#e33e33] hover:bg-[#c22e24] rounded font-mono uppercase tracking-widest"
            >
              Logout
            </button>
          </div>
        </div>

        {/* RIGHT – QR SECTION */}
        <div className="flex flex-col items-center justify-center">
          <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-lg">
            <QRCodeCanvas
              value={qrText}
              size={220}
              level="H"
              includeMargin
            />
          </div>

          <button
            onClick={downloadQR}
            className="mt-4 px-6 py-3
              bg-gradient-to-r from-[#f06a6a] via-[#e33e33] to-[#c92a2a]
              rounded font-bold uppercase tracking-widest
              hover:shadow-[0_0_20px_rgba(227,62,51,0.6)]
              transition"
          >
            Download QR
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;

const Detail = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="text-gray-400 w-28">{label}:</span>
    <span className="text-white">{value || "-"}</span>
  </div>
);
