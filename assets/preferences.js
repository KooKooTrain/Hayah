(() => {
  const storageKey = "hayati.preferences";
  const defaults = {
    theme: "light",
    textSize: "medium",
    highContrast: false,
    adhdFriendly: false,
    name: "Divya Bhosale",
    email: "",
  };

  const readPreferences = () => {
    try {
      const saved = {
        ...defaults,
        ...JSON.parse(localStorage.getItem(storageKey) || "{}"),
      };
      if (saved.name === "Family profile") saved.name = defaults.name;
      return saved;
    } catch {
      return { ...defaults };
    }
  };

  const applyPreferences = (preferences) => {
    const root = document.documentElement;
    const isEntryPage = ["/", "/signin"].includes(window.location.pathname);
    const theme = isEntryPage ? "light" : preferences.theme;
    root.dataset.theme = theme;
    root.dataset.textSize = preferences.textSize;
    root.dataset.contrast = preferences.highContrast ? "high" : "normal";
    root.dataset.adhd = String(preferences.adhdFriendly);
    root.style.colorScheme = theme;
    const logo =
      theme === "dark"
        ? "/assets/hayati-logo-dark.png"
        : "/assets/hayati-logo.png";
    document.querySelectorAll(".brand img").forEach((image) => {
      image.src = logo;
    });
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = theme === "dark" ? "#111116" : "#ffffff";
    }
  };

  let preferences = readPreferences();
  applyPreferences(preferences);

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    applyPreferences(preferences);
    const nav = document.querySelector("#nav");
    const roleButtons = document.querySelectorAll("[data-role]");
    let role = "adult";
    try {
      role = localStorage.getItem("hayati.role") || role;
    } catch {}

    const updateRole = (nextRole) => {
      role = nextRole;
      roleButtons.forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.role === role),
        );
      });
      try {
        localStorage.setItem("hayati.role", role);
      } catch {}
    };

    roleButtons.forEach((button) => {
      button.addEventListener("click", () => updateRole(button.dataset.role));
    });
    updateRole(role);

    if (nav) {
      const updateNav = () => nav.classList.toggle("s", window.scrollY > 20);
      window.addEventListener("scroll", updateNav, { passive: true });
      updateNav();
    }

    const save = () => {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
      applyPreferences(preferences);
      const status = document.querySelector("[data-save-status]");
      if (status) {
        status.textContent = "Saved on this device";
        status.classList.add("is-saved");
      }
    };

    const setValue = (key, value) => {
      preferences = { ...preferences, [key]: value };
      save();
      render();
    };

    const render = () => {
      document.querySelectorAll("[data-setting]").forEach((control) => {
        const { setting, value } = control.dataset;
        if (control.type === "checkbox") {
          control.checked = Boolean(preferences[setting]);
        } else {
          control.setAttribute(
            "aria-pressed",
            String(preferences[setting] === value),
          );
        }
      });

      const name = document.querySelector('[data-profile-field="name"]');
      const email = document.querySelector('[data-profile-field="email"]');
      if (name) name.value = preferences.name;
      if (email) email.value = preferences.email;
      const identity = document.querySelector("[data-profile-identity]");
      if (identity) identity.textContent = preferences.name || "Divya Bhosale";
    };

    document.querySelectorAll("[data-setting]").forEach((control) => {
      const { setting, value } = control.dataset;
      const eventName = control.type === "checkbox" ? "change" : "click";
      control.addEventListener(eventName, () => {
        const nextValue = control.type === "checkbox" ? control.checked : value;
        setValue(setting, nextValue);
      });
    });

    document.querySelectorAll("[data-profile-field]").forEach((field) => {
      field.addEventListener("input", () => {
        preferences = {
          ...preferences,
          [field.dataset.profileField]: field.value,
        };
        const status = document.querySelector("[data-save-status]");
        if (status) {
          status.textContent = "Unsaved changes";
          status.classList.remove("is-saved");
        }
      });
    });

    document
      .querySelector("[data-profile-save]")
      ?.addEventListener("click", save);

    document.querySelectorAll("[data-settings-section]").forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.dataset.settingsSection;
        document.querySelectorAll("[data-settings-section]").forEach((item) => {
          item.setAttribute("aria-current", String(item === button));
        });
        document.querySelectorAll("[data-settings-panel]").forEach((panel) => {
          panel.hidden = panel.dataset.settingsPanel !== section;
        });
      });
    });

    document
      .querySelector("[data-reset-settings]")
      ?.addEventListener("click", () => {
        preferences = {
          ...preferences,
          theme: defaults.theme,
          textSize: defaults.textSize,
          highContrast: defaults.highContrast,
          adhdFriendly: defaults.adhdFriendly,
        };
        save();
        render();
      });

    render();
    root.dataset.preferencesReady = "true";
  });
})();
