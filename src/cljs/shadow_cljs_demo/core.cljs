(ns shadow-cljs-demo.core
  (:require [reagent.core :as reagent :refer [atom]]
            [shadow-cljs-demo.common :refer [msg]]))

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Application"}))

(defn hello-world []
  [:div
   [:h1 (:text @app-state)]
   [:h2 "H2"]
   [:h3 (msg)]])

(defn start []
  (reagent/render-component [hello-world]
                            (. js/document (getElementById "app"))))

(defn ^:export init []
  ;; init is called ONCE when the page loads
  ;; this is called in the index.html and must be exported
  ;; so it is available even in :advanced release builds
  (start))

(defn stop []
  ;; stop is called before any code is reloaded
  ;; this is controlled by :before-load in the config
  (js/console.log "stop"))
