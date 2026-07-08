import React, { createContext, useContext, useState } from 'react';
import {
  GlobeIcon, BriefcaseIcon, MonitorIcon, MailIcon, UserIcon,
} from '../components/Icons';

/* ── Single source of truth for vault data ── */
const INITIAL_VAULT = [
  { id: 1,  name: 'GitHub',      username: 'dev@email.com',      email: 'dev@email.com',      password: 'Gh$ecure#2024!xZ',  url: 'https://github.com',      category: 'Development', strength: 4, Icon: GlobeIcon,      color: 'vi-green',  tags: ['work','git'],           notes: 'Main GitHub account. Uses SSH key for repos.', lastUpdated: '2 days ago',  createdAt: 'Jan 12, 2024', favorite: false },
  { id: 2,  name: 'Notion',      username: 'workaccount',        email: 'work@email.com',      password: 'Notion@Work99!',    url: 'https://notion.so',       category: 'Work',        strength: 3, Icon: BriefcaseIcon,  color: 'vi-blue',   tags: ['work','notes'],         notes: '',                                             lastUpdated: '5 days ago',  createdAt: 'Feb 3, 2024',  favorite: false },
  { id: 3,  name: 'Google',      username: 'personal',           email: 'personal@gmail.com',  password: 'G00g!eP@ss2024',    url: 'https://google.com',      category: 'Personal',    strength: 4, Icon: GlobeIcon,      color: 'vi-blue',   tags: ['personal'],             notes: '2FA enabled via Authenticator app.',           lastUpdated: '1 week ago',  createdAt: 'Dec 1, 2023',  favorite: true  },
  { id: 4,  name: 'Amazon',      username: 'shopper99',          email: 'shop@email.com',      password: 'amzn1234',          url: 'https://amazon.com',      category: 'Shopping',    strength: 2, Icon: GlobeIcon,      color: 'vi-amber',  tags: ['shopping'],             notes: '',                                             lastUpdated: '2 weeks ago', createdAt: 'Mar 5, 2024',  favorite: false },
  { id: 5,  name: 'PayPal',      username: 'finance_user',       email: 'finance@email.com',   password: 'pay123',            url: 'https://paypal.com',      category: 'Finance',     strength: 1, Icon: GlobeIcon,      color: 'vi-red',    tags: ['finance','payments'],   notes: 'Linked to main bank. Update this password!',   lastUpdated: '1 month ago', createdAt: 'Nov 20, 2023', favorite: false },
  { id: 6,  name: 'Slack',       username: 'dev@company.com',    email: 'dev@company.com',     password: 'Sl@ck#Team2024',    url: 'https://slack.com',       category: 'Work',        strength: 3, Icon: MonitorIcon,    color: 'vi-purple', tags: ['work','comms'],         notes: '',                                             lastUpdated: '3 days ago',  createdAt: 'Jan 28, 2024', favorite: true  },
  { id: 7,  name: 'Figma',       username: 'designer_jd',        email: 'design@email.com',    password: 'Fig#Design!99Z',    url: 'https://figma.com',       category: 'Development', strength: 4, Icon: BriefcaseIcon,  color: 'vi-green',  tags: ['design','work'],        notes: 'Pro plan. Shared with design team.',           lastUpdated: '4 days ago',  createdAt: 'Feb 14, 2024', favorite: false },
  { id: 8,  name: 'Dropbox',     username: 'fileshare_jd',       email: 'files@email.com',     password: 'drop456box',        url: 'https://dropbox.com',     category: 'Personal',    strength: 2, Icon: GlobeIcon,      color: 'vi-amber',  tags: ['storage'],              notes: '',                                             lastUpdated: '3 weeks ago', createdAt: 'Oct 10, 2023', favorite: false },
  { id: 9,  name: 'LinkedIn',    username: 'john.doe.dev',       email: 'profile@email.com',   password: 'Link3dIn#Pro!',     url: 'https://linkedin.com',    category: 'Work',        strength: 3, Icon: UserIcon,       color: 'vi-blue',   tags: ['work','social'],        notes: '',                                             lastUpdated: '1 week ago',  createdAt: 'Sep 5, 2023',  favorite: false },
  { id: 10, name: 'Netflix',     username: 'streamer_jd',        email: 'stream@email.com',    password: 'netflix99',         url: 'https://netflix.com',     category: 'Personal',    strength: 1, Icon: MonitorIcon,    color: 'vi-red',    tags: ['streaming'],            notes: 'Shared with family. Standard plan.',           lastUpdated: '2 months ago',createdAt: 'Aug 1, 2023',  favorite: false },
  { id: 11, name: 'Twitter / X', username: 'johndoe_x',          email: 'social@email.com',    password: 'Tw!tter2024xX',     url: 'https://x.com',           category: 'Personal',    strength: 2, Icon: GlobeIcon,      color: 'vi-amber',  tags: ['social'],               notes: '',                                             lastUpdated: '6 days ago',  createdAt: 'Jul 22, 2023', favorite: false },
  { id: 12, name: 'Gmail',       username: 'me@gmail.com',       email: 'me@gmail.com',        password: 'Gm@ilS3cure!24',    url: 'https://mail.google.com', category: 'Personal',    strength: 4, Icon: MailIcon,       color: 'vi-green',  tags: ['email','personal'],     notes: '2FA on. Recovery email set.',                  lastUpdated: '1 day ago',   createdAt: 'Jun 10, 2023', favorite: true  },
];

const VaultContext = createContext(null);

export function VaultProvider({ children }) {
  const [vault, setVault] = useState(INITIAL_VAULT);

  function toggleFavorite(id) {
    setVault(prev =>
      prev.map(item => item.id === id ? { ...item, favorite: !item.favorite } : item)
    );
  }

  function deleteItem(id) {
    setVault(prev => prev.filter(item => item.id !== id));
  }

  const favorites = vault.filter(v => v.favorite);

  return (
    <VaultContext.Provider value={{ vault, setVault, toggleFavorite, deleteItem, favorites }}>
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const ctx = useContext(VaultContext);
  return ctx || { vault: [], setVault: () => {}, toggleFavorite: () => {}, deleteItem: () => {}, favorites: [] };
}