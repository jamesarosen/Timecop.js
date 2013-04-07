require 'json'
require 'pathname'

project_root = Pathname.new File.expand_path(File.dirname(__FILE__))

$LOAD_PATH << project_root.join('lib').to_s
require 'timecop/compilation_task'
require 'timecop/jshint_task'

# Build-related information:

timecop_version = JSON.parse(File.read(project_root.join('package.json')))['version']

lib_dir = project_root.join('lib')
lib_files = [ 'Timecop', 'MockDate', 'TimeStackItem' ].map do |f|
  lib_dir.join("#{f}.js").to_s
end
template_file = lib_dir.join('BuildTemplate.js')

tmp_dir   = project_root.join('tmp')
tmp_dist  = tmp_dir.join('timecop.js').to_s

dist_file = project_root.join("timecop.js").to_s

# Tasks:

task :default => :test

require 'rake/clean'

directory tmp_dir.to_s

desc "Run tests on the compiled Timecop library"
task :test => :jshint do
  sh "bundle exec jasmine-headless-webkit" do |ok, res|
    fail "Test failures" unless ok
  end
  puts "Tests passed"
end

namespace :jshint do
  jshint_executable = project_root.join('node_modules', 'jshint', 'bin', 'jshint').to_s
  jshint_config     = project_root.join('.jshintrc').to_s

  file jshint_executable do
    sh 'npm', 'install'
  end

  jshint :check_source do |t|
    t.files       = lib_files
    t.executable  = jshint_executable
    t.config      = jshint_config
    t.marker_file = tmp_dir.join('lib.hinted')
  end

  jshint :check_tmp_dist do |t|
    t.files       = [ tmp_dist ]
    t.executable  = jshint_executable
    t.config      = jshint_config
    t.marker_file = "#{tmp_dist}.hinted"
  end

  task :check => [ 'jshint:check_source', 'jshint:check_tmp_dist' ] do
    puts "JSHint checks passed"
  end
end

desc 'Run JSHint checks against JavaScript'
task :jshint => 'jshint:check'

compile tmp_dist do |t|
  t.source_files = lib_files
  t.template     = template_file
  t.version      = timecop_version
end

file dist_file => [ tmp_dist, 'test' ] do |t|
  cp t.prerequisites.first, t.name
end

desc "Compile #{dist_file} for release"
task :dist => dist_file
