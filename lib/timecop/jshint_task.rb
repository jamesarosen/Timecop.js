require 'rake/tasklib'

module Timecop

  class JSHintTask < Rake::TaskLib

    attr_accessor :name, :files, :executable, :config

    def initialize(name)
      @name       = name
      @files      = []
      @executable = nil
      @config     = nil
      yield self if block_given?
      define
    end

    def define
      files       = self.files.map(&:to_s)
      executable  = self.executable.to_s
      config      = self.config.to_s
      task name => [ *files, executable, config ] do
        sh executable, *files, '--config', config do |ok, res|
          fail 'JSHint found errors.' unless ok
        end
      end
    end

  end

end
