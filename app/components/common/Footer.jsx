import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, MessageCircle, BookOpen, Users, Briefcase, Heart } from 'lucide-react';

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-amber-200 to-orange-200 relative overflow-hidden">
      {/* Decorative SVG Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              <rect width="20" height="20" fill="rgba(255,165,0,0.1)"/>
              <rect x="20" y="20" width="20" height="20" fill="rgba(255,165,0,0.1)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/skillverse.png"
                alt="Skillverse Logo"
                width={48}
                height={48}
                className="rounded-lg transform hover:rotate-6 transition-transform duration-300"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                SkillVerse
              </h3>
            </div>
            <p className="text-amber-900/80 leading-relaxed">
              Empowering minds through innovative learning experiences and collaborative growth.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: MessageCircle, label: "Chat" },
                { Icon: BookOpen, label: "Learn" },
                { Icon: Users, label: "Community" }
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-110 transform transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-amber-900">Resources</h4>
            <ul className="space-y-3">
              {Resources.slice(0, 6).map((item) => (
                <li key={item}>
                  <Link
                    href={item.toLowerCase().replace(/\s+/g, '-')}
                    className="text-amber-900/70 hover:text-orange-600 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-amber-900">Plans</h4>
            <ul className="space-y-3">
              {Plans.map((plan) => (
                <li key={plan}>
                  <Link
                    href={plan.toLowerCase().replace(/\s+/g, '-')}
                    className="text-amber-900/70 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Briefcase className="w-4 h-4 group-hover:text-orange-500 transition-colors duration-300" />
                    <span>{plan}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-amber-900">Community</h4>
            <ul className="space-y-3">
              {Community.map((item) => (
                <li key={item}>
                  <Link
                    href={item.toLowerCase().replace(/\s+/g, '-')}
                    className="text-amber-900/70 hover:text-orange-600 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <Users className="w-4 h-4 group-hover:text-orange-500 transition-colors duration-300" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-amber-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-8">
              {BottomFooter.map((item) => (
                <Link
                  key={item}
                  href={item.toLowerCase().replace(/\s+/g, '-')}
                  className="text-amber-900/70 hover:text-orange-600 transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-amber-900/70">
              <Heart className="w-4 h-4 text-orange-500" />
              <span>Made with love by Team Supra & Co. © 2024 SkillVerse</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;