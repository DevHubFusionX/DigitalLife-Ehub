"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { Resource } from "@/components/resources/resourcesData";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ResourceCrudModal from "@/components/admin/ResourceCrudModal";
import ChangePasswordModal from "@/components/admin/ChangePasswordModal";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface DBResource extends Resource {
  youtubeUrl?: string;
  createdAt?: number;
}

export default function AdminPage() {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  // Data state
  const [resources, setResources] = useState<DBResource[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [initialData, setInitialData] = useState<DBResource | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Authorized Admin Whitelist
  const ALLOWED_ADMINS = [
    "admin@digitallife-ehub.com",
    "admin@digitallife.com",
    "frank@digitallife-ehub.com",
  ];

  // 1. Monitor Auth State with Whitelist check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoadingAuth(true);
        const emailLower = (currentUser.email || "").toLowerCase();
        const isWhitelisted = ALLOWED_ADMINS.includes(emailLower);
        
        let hasFirestoreAccess = false;
        if (!isWhitelisted) {
          try {
            const adminDoc = await getDoc(doc(db, "admins", currentUser.uid));
            if (adminDoc.exists()) {
              hasFirestoreAccess = true;
            }
          } catch (e) {
            console.error("Error verifying admin role in firestore:", e);
          }
        }

        if (isWhitelisted || hasFirestoreAccess) {
          setUser(currentUser);
          fetchResources();
        } else {
          await signOut(auth);
          setAuthError("Access denied: Your account does not have admin permissions.");
          setUser(null);
        }
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Resources from Firestore
  const fetchResources = async () => {
    setLoadingData(true);
    try {
      const querySnapshot = await getDocs(collection(db, "resources"));
      const items: DBResource[] = [];
      querySnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as DBResource);
      });
      // Sort by creation date or fallback to title
      items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setResources(items);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoadingData(false);
    }
  };



  // 4. Admin Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setResources([]);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // 5. Delete Resource
  const handleDeleteResource = async (resource: DBResource) => {
    if (!window.confirm(`Are you sure you want to delete "${resource.title}"?`)) return;

    try {
      // 1. Delete document from Firestore
      await deleteDoc(doc(db, "resources", resource.id));

      // 2. If it had an uploaded cover in Firebase Storage, try deleting it
      if (resource.coverUrl && resource.coverUrl.includes("firebasestorage.googleapis.com")) {
        try {
          const imageRef = ref(storage, resource.coverUrl);
          await deleteObject(imageRef);
        } catch (storageErr) {
          console.warn("Storage deletion warning (image may have been deleted already):", storageErr);
        }
      }

      fetchResources();
    } catch (err) {
      console.error("Error deleting resource:", err);
      alert("Failed to delete resource.");
    }
  };

  // 6. Open Edit Modal
  const handleOpenEdit = (res: DBResource) => {
    setIsEditing(true);
    setSelectedId(res.id);
    setInitialData(res);
    setIsModalOpen(true);
  };

  // 7. Open Add Modal
  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedId("");
    setInitialData(null);
    setIsModalOpen(true);
  };

  // 8. Save Success Callback
  const handleSaveSuccess = () => {
    setIsModalOpen(false);
    fetchResources();
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <>
      <AdminDashboard
        resources={resources}
        loadingData={loadingData}
        onSignOut={handleSignOut}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteResource}
        onAdd={handleOpenAdd}
        onChangePassword={() => setIsPasswordModalOpen(true)}
      />

      <AnimatePresence>
        {isModalOpen && (
          <ResourceCrudModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isEditing={isEditing}
            selectedId={selectedId}
            initialData={initialData}
            onSaveSuccess={handleSaveSuccess}
          />
        )}
        {isPasswordModalOpen && (
          <ChangePasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
