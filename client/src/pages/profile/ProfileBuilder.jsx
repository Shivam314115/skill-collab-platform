import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ProfileForm from "../../components/profile/ProfileForm";
import { createUserProfile, getUserProfile } from "../../lib/api"; // fallback below if missing
import { BrandLockup, PageFrame, PatternArt } from "../../components/common/AgileUI";

export default function ProfileBuilder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        if (typeof getUserProfile === "function") {
          const p = await getUserProfile(user.id);
          setInitial(p || {});
        } else {
          // no helper: attempt fetch
          const res = await fetch(`/api/profile/${user.$id}`);
          if (res.ok) setInitial(await res.json());
        }
      } catch (e) {
        setInitial({});
      }
    };
    load();
  }, [user]);

  const handleSave = async (payload) => {
    if (!user) throw new Error("Not authenticated");
    setSaving(true);
    try {
      if (typeof createUserProfile === "function") {
        await createUserProfile(user.id, payload);
      } else {
        await fetch(`/api/profile/${user.$id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      // after initial setup redirect to dashboard
      navigate("/dashboard", { replace: true });
    } finally {
      setSaving(false);
    }
  };

  if (initial === null) {
    return <PageFrame className="flex items-center justify-center p-8 text-center font-bold text-[#999]">Loading profile builder...</PageFrame>;
  }

  return (
    <PageFrame className="p-4 md:p-7">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
        <section>
          <BrandLockup size="md" className="mb-10" />
          <h1 className="text-4xl font-black text-white md:text-5xl">Complete your profile</h1>
          <p className="mb-8 mt-3 text-lg font-semibold text-[#aaa]">
            Help the right collaborators understand your skills and working style.
          </p>
          <ProfileForm initial={initial} onSave={handleSave} saving={saving} />
        </section>
        <PatternArt className="sticky top-8 hidden max-h-[760px] lg:block" />
      </div>
    </PageFrame>
  );
}
