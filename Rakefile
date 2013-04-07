# Build-related information:

require 'json'

project_root = File.expand_path(File.dirname(__FILE__))
timecop_version = JSON.parse(File.read(File.join(project_root, 'package.json')))['version']

lib_dir = File.join(project_root, 'lib')
lib_files = [ 'Timecop', 'MockDate', 'TimeStackItem' ].map do |f|
  File.join(lib_dir, "#{f}.js")
end

tmp_dir   = File.join(project_root, 'tmp')
tmp_dist  = File.join(tmp_dir, 'timecop.js')

dist_file = File.join(project_root, "timecop.js")

# Tasks:

task :default => :test

require 'rake/clean'
CLEAN << tmp_dir

directory tmp_dir

desc "Run tests on the compiled Timecop library"
task :test => :jshint do
  sh "bundle exec jasmine-headless-webkit" do |ok, res|
    fail "Test failures" unless ok
  end
  puts "Tests passed"
end

namespace :jshint do
  jshint_executable = File.join(project_root, 'node_modules', 'jshint', 'bin', 'jshint')

  file jshint_executable do
    sh 'npm', 'install'
  end

  jshint_config = File.join(project_root, '.jshintrc')

  task :check_source => [ *lib_files, jshint_config, jshint_executable ] do
    sh 'jshint', *lib_files, '--config', jshint_config do |ok, res|
      fail 'JSHint found errors in source.' unless ok
    end
  end

  task :check_tmp_dist => [ tmp_dist, jshint_config, jshint_executable ] do
    sh 'jshint', tmp_dist, '--config', jshint_config do |ok, res|
      fail 'JSHint found errors in compiled output.' unless ok
    end
  end

  task :check => [ 'jshint:check_source', 'jshint:check_tmp_dist' ] do
    puts "JSHint checks passed"
  end
end

desc 'Run JSHint checks against JavaScript'
task :jshint => 'jshint:check'

template_file = File.join(lib_dir, 'BuildTemplate.js')

file tmp_dist => [ *lib_files, tmp_dir, template_file ] do
  template = File.read(template_file)

  contents = lib_files.
              map { |f| File.read(f) }.
              join("\n\n")

  compiled = template.
              sub('{{ TIMECOP_VERSION }}', timecop_version).
              sub('{{ TIMECOP_LIBRARIES }}', contents)

  File.open(tmp_dist, 'w') { |f| f.write(compiled) }

  puts("Wrote #{tmp_dist}");
end

file dist_file => tmp_dist do |t|
  cp t.prerequisites.first, t.name
end

desc "Compile #{dist_file} for release"
task :dist => dist_file
