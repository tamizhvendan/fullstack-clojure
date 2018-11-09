(ns shadow-cljs-demo.core
  (:require [shadow-cljs-demo.common :refer [msg]]
            [clojure.java.io :as io]
            [ring.adapter.jetty :refer [run-jetty]]
            [compojure.core :refer [ANY GET PUT POST DELETE routes]]
            [compojure.route :refer [resources]]
            [ring.util.response :refer [response]])
  (:gen-class))

(defn home-routes []
  (routes
   (GET "/" _
     (-> "public/index.html"
         io/resource
         io/input-stream
         response
         (assoc :headers {"Content-Type" "text/html; charset=utf-8"})))
   (resources "/")))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (run-jetty (home-routes) {:port 3000}))
