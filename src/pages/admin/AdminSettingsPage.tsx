import { useState, useEffect } from "react";
import { User, Lock, Building2, Bell, Save, Check } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import type { UserSettings } from "../../lib/types/database";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const defaultSettings: UserSettings = {
  email_notifications: true,
  compact_sidebar: false,
  agency_name: "FenixSites",
  agency_phone: "",
  agency_email: "",
  default_currency: "ZAR",
};

export function AdminSettingsPage() {
  const { user, profile, hasRole, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [settings, setSettings] = useState<UserSettings>({
    ...defaultSettings,
    ...profile?.settings,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setSettings({ ...defaultSettings, ...profile.settings });
    }
  }, [profile]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const saveProfile = async () => {
    if (!supabase || !user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() || null, settings })
      .eq("id", user.id);
    setSaving(false);
    if (error) showMessage("error", error.message);
    else {
      await refreshProfile();
      showMessage("success", "Profile saved successfully.");
    }
  };

  const changePassword = async () => {
    if (!supabase) return;
    if (newPassword.length < 8) {
      showMessage("error", "New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("error", "Passwords do not match.");
      return;
    }

    setSaving(true);

    if (user?.email && currentPassword) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (signInError) {
        setSaving(false);
        showMessage("error", "Current password is incorrect.");
        return;
      }
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);

    if (error) showMessage("error", error.message);
    else {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showMessage("success", "Password updated successfully.");
    }
  };

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-white text-2xl font-semibold mb-1">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account, security, and agency preferences</p>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
              : "bg-red-500/10 border border-red-500/20 text-red-300"
          }`}
        >
          {message.type === "success" ? <Check className="w-4 h-4" /> : null}
          {message.text}
        </div>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white/[0.03] border border-white/[0.06] p-1 h-auto flex-wrap">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white rounded-lg gap-2">
            <User className="w-3.5 h-3.5" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white rounded-lg gap-2">
            <Lock className="w-3.5 h-3.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white rounded-lg gap-2">
            <Bell className="w-3.5 h-3.5" /> Notifications
          </TabsTrigger>
          {hasRole("super_admin", "admin") && (
            <TabsTrigger value="agency" className="data-[state=active]:bg-white/10 text-gray-400 data-[state=active]:text-white rounded-lg gap-2">
              <Building2 className="w-3.5 h-3.5" /> Agency
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-white/[0.02] border-white/[0.06] p-6 rounded-2xl space-y-5">
            <div>
              <Label className="text-gray-300">Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your display name"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input
                value={user?.email ?? ""}
                disabled
                className="mt-1.5 bg-white/[0.02] border-white/10 text-gray-500"
              />
              <p className="text-gray-600 text-xs mt-1">Email is managed through your account provider.</p>
            </div>
            <div>
              <Label className="text-gray-300">Role</Label>
              <Input
                value={profile?.role?.replace("_", " ") ?? ""}
                disabled
                className="mt-1.5 bg-white/[0.02] border-white/10 text-gray-500 capitalize"
              />
            </div>
            <Button
              onClick={saveProfile}
              disabled={saving}
              className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving…" : "Save Profile"}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-white/[0.02] border-white/[0.06] p-6 rounded-2xl space-y-5">
            <div>
              <Label className="text-gray-300">Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <Button
              onClick={changePassword}
              disabled={saving || !newPassword}
              className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-xl"
            >
              <Lock className="w-4 h-4 mr-2" />
              {saving ? "Updating…" : "Update Password"}
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-white/[0.02] border-white/[0.06] p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Email notifications</p>
                <p className="text-gray-600 text-xs mt-0.5">Get notified about new inquiries</p>
              </div>
              <Switch
                checked={settings.email_notifications ?? true}
                onCheckedChange={(v) => updateSetting("email_notifications", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Compact sidebar</p>
                <p className="text-gray-600 text-xs mt-0.5">Use a narrower navigation sidebar</p>
              </div>
              <Switch
                checked={settings.compact_sidebar ?? false}
                onCheckedChange={(v) => updateSetting("compact_sidebar", v)}
              />
            </div>
            <Button
              onClick={saveProfile}
              disabled={saving}
              className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </Card>
        </TabsContent>

        {hasRole("super_admin", "admin") && (
          <TabsContent value="agency">
            <Card className="bg-white/[0.02] border-white/[0.06] p-6 rounded-2xl space-y-5">
              <div>
                <Label className="text-gray-300">Agency Name</Label>
                <Input
                  value={settings.agency_name ?? ""}
                  onChange={(e) => updateSetting("agency_name", e.target.value)}
                  className="mt-1.5 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Contact Email</Label>
                <Input
                  type="email"
                  value={settings.agency_email ?? ""}
                  onChange={(e) => updateSetting("agency_email", e.target.value)}
                  className="mt-1.5 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Phone</Label>
                <Input
                  value={settings.agency_phone ?? ""}
                  onChange={(e) => updateSetting("agency_phone", e.target.value)}
                  placeholder="+27 …"
                  className="mt-1.5 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Default Currency</Label>
                <Input
                  value={settings.default_currency ?? "ZAR"}
                  onChange={(e) => updateSetting("default_currency", e.target.value)}
                  className="mt-1.5 bg-white/5 border-white/10 text-white max-w-[120px]"
                />
              </div>
              <Button
                onClick={saveProfile}
                disabled={saving}
                className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] rounded-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Agency Settings
              </Button>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
